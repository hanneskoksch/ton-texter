import { db } from "@/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userId = data.get("userId") as string;
    const file = data.get("file") as File;

    if (!file || !userId || !file.type.startsWith("audio/")) {
      return NextResponse.error();
    }

    // Create S3 client
    const client = new S3Client({
      region: process.env.S3_REGION!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    // separate filename from file extension
    const indexOfLastDot = file.name.lastIndexOf(".");
    let fileName = file.name.slice(0, indexOfLastDot);
    const fileExtension = file.name.slice(indexOfLastDot);

    // reduce length of filename to 200 characters
    if (fileName.length > 200) {
      fileName = fileName.substring(0, 200);
    }

    // create file name with a random uuid and the file extension
    const fileNameWithUuid = `${fileName}-${randomUUID()}`;
    const Body = (await file.arrayBuffer()) as Buffer;

    // Upload file to S3
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: `${fileNameWithUuid}${fileExtension}`,
      Body,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode === 200) {
      // Create a new transcript in the database
      const newTranscript = await db.transcript.create({
        data: {
          fileName: fileNameWithUuid,
          fileExtension: fileExtension,
          fileNameWithExt: `${fileNameWithUuid}${fileExtension}`,
          displayFilename: `${fileName}${fileExtension}`,
          userId: userId,
        },
      });

      if (!newTranscript) {
        throw new Error("Failed to create transcript");
      }
    } else {
      throw new Error("Failed to upload file");
    }

    // Start transcription
    fetch(
      `https://hzjgd3yz9g.execute-api.eu-central-1.amazonaws.com/dev/start_transcription?key=${process.env.TRANSCRIPTION_SERVICE_API_KEY}`,
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error();
  }
}
