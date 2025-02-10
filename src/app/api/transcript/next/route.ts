import { db } from "@/db";
import { resetUnhealthyTranscripts } from "@/transcription-service/transcription-service";
import { sendQueueMetricsToCloudwatch } from "@/utils/metrics";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";
import { checkApiKey } from "../security";

export async function GET(request: NextRequest) {
  checkApiKey(request);

  try {
    // Find and update the first PENDING transcript.
    // Wrapped in a transaction to prevent returning the same transcript to multiple requests.
    const updatedTranscript = await db.$transaction(async (prisma) => {
      const transcript = await prisma.transcript.findFirst({
        where: { status: TranscriptStatus.PENDING },
        orderBy: { createdAt: "asc" },
      });

      const unhealthyTranscripts = await resetUnhealthyTranscripts(prisma);

      let updated;
      if (unhealthyTranscripts.length > 0) {
        // If an unhealthy tran script is found, update its status to FORWARDED
        updated = await prisma.transcript.update({
          where: { id: unhealthyTranscripts[0].id },
          data: {
            status: TranscriptStatus.FORWARDED,
            // Update heartbeat to catch unhealthy transcript before TranscriptStatus.PROCESSING state
            heartbeat: new Date(),
          },
        });
      } else if (transcript) {
        // If a transcript is found, update its status to FORWARDED
        updated = await prisma.transcript.update({
          where: { id: transcript.id },
          data: {
            status: TranscriptStatus.FORWARDED,
            // Update heartbeat to catch unhealthy transcript before TranscriptStatus.PROCESSING state
            heartbeat: new Date(),
          },
        });
      } else {
        // Return null if no transcript is found
        return null;
      }
      return updated;
    });

    // Return empty response if no transcript is found
    if (!updatedTranscript) {
      return Response.json({});
    }

    await sendQueueMetricsToCloudwatch();

    // Directly return updated transcript
    return Response.json(updatedTranscript);
  } catch (error) {
    console.error("Error fetching or updating transcript:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
