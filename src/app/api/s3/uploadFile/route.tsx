import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userId = data.get("userId") as string;
    const file = data.get("file") as File;

    if (!file || !userId) {
      return NextResponse.json({ success: false });
    }

    // Create S3 client
    const client = new S3Client({
      region: process.env.S3_REGION!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    // Limit the file name to 200 characters
    let originalFilename = file.name;
    if (file.name.length > 200) {
      originalFilename = file.name.substring(0, 200);
    }

    // create file name with a random uuid and the file extension
    const fileName = `${originalFilename}-${randomUUID()}.${file.name
      .split(".")
      .pop()}`;
    const Body = (await file.arrayBuffer()) as Buffer;

    // Upload file to S3
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: fileName,
      Body,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode === 200) {
      // Create a new transcript in the database
      const newTranscript = await db.transcript.create({
        data: {
          filename: fileName,
          originalFilename: originalFilename,
          userId: userId,
        },
      });

      if (!newTranscript) {
        throw new Error("Failed to create transcript");
      }
    } else {
      throw new Error("Failed to upload file");
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
