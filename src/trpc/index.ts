import { db } from "@/db";
import { logMessage } from "@/lib/cloudwatch/utils";
import {
  createPresignedUploadUrl,
  createPresignedUrl,
  deleteS3Objects,
} from "@/lib/s3/utils";
import { createClient } from "@/lib/supabase/server";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";

/**
 * This is the router that will be used by the server.
 * It contains all the procedures that can be called by the client.
 */
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    // get current user from auth service
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if user is already in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // if user ist not yet in db, create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: "Herr Hardgecodet",
        },
      });
    }

    return { success: true };
  }),
  getUserTranscriptions: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.transcript.findMany({
      where: {
        userId,
      },
    });
  }),
  deleteTranscript: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.transcript.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.transcript.delete({
        where: {
          id: input.id,
          userId,
        },
      });

      // Also delete related file(s) from s3 storage
      deleteS3Objects({
        key: file.fileName,
        fileExtension: file.fileExtension,
      });

      return file;
    }),
  donwloadTranscript: privateProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileExtension: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify that user really owns the file
      const { userId } = ctx;
      const file = await db.transcript.findFirst({
        where: {
          fileName: input.fileName,
          userId,
        },
      });
      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      let s3Url: string;
      try {
        // Create presigned url
        s3Url = await createPresignedUrl({
          key: `${input.fileName}${input.fileExtension}`,
        });
      } catch (error) {
        throw new TRPCError({ code: "NOT_FOUND", cause: error });
      }
      return s3Url;
    }),
  getUploadUrl: privateProcedure
    .input(
      z.object({
        fileName: z.string(),
        audioDuration: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      logMessage(`getUploadUrl called by ${ctx.userId}`, "Info");
      try {
        const { userId } = ctx;
        const fileName = input.fileName;

        // separate filename from file extension
        const indexOfLastDot = fileName.lastIndexOf(".");
        let baseFileName = fileName.slice(0, indexOfLastDot);
        const fileExtension = fileName.slice(indexOfLastDot);

        // reduce length of filename to 200 characters
        if (baseFileName.length > 200) {
          baseFileName = baseFileName.substring(0, 200);
        }

        // create file name with a random uuid and the file extension
        const fileNameWithUuid = `${baseFileName}-${randomUUID()}`;

        const url = await createPresignedUploadUrl({
          key: `${fileNameWithUuid}${fileExtension}`,
        });

        return {
          success: true,
          url,
          fileName: baseFileName,
          audioDuration: input.audioDuration,
          fileNameWithUuid,
          fileExtension,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
  createTranscription: privateProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileNameWithUuid: z.string(),
        fileExtension: z.string(),
        audioDuration: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const fileName = input.fileName;
        const fileNameWithUuid = input.fileNameWithUuid;
        const fileExtension = input.fileExtension;

        // Create a new transcript in the database
        const newTranscript = await db.transcript.create({
          data: {
            fileName: fileNameWithUuid,
            fileExtension: fileExtension,
            fileNameWithExt: `${fileNameWithUuid}${fileExtension}`,
            displayFilename: `${fileName}${fileExtension}`,
            audioDuration: input.audioDuration,
            userId: userId,
          },
        });

        // Gather metrics for transcription service
        const result = await db.transcript.aggregate({
          _count: { id: true },
          _sum: { audioDuration: true },
          where: { status: "PENDING" },
        });

        const allPendingTranscriptsCount = result._count.id || 0;
        const allPendingTranscriptsDuration = result._sum.audioDuration || 0;

        logMessage(
          `Transcription triggered ${userId}.${newTranscript.id}`,
          "Info",
        );

        // Start transcription
        fetch(
          "https://hzjgd3yz9g.execute-api.eu-central-1.amazonaws.com/dev/start_transcription?" +
            new URLSearchParams({
              key: process.env.TRANSCRIPTION_SERVICE_API_KEY,
              total_duration: allPendingTranscriptsDuration.toString(),
              total_files: allPendingTranscriptsCount.toString(),
              logging_triggering_user_id: userId,
              logging_triggering_transcript_id: newTranscript.id,
            }).toString(),
        );

        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
