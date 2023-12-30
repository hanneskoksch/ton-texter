import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

    const client = new S3Client({
      region: process.env.S3_REGION!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    // create file name with a random uuid and the file extension
    const fileName = `${randomUUID()}.${file.name.split(".").pop()}`;
    const Body = (await file.arrayBuffer()) as Buffer;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: fileName,
      Body,
    });

    const response = await client.send(command);

    if (response.$metadata.httpStatusCode === 200) {
      const s3url = await createPresignedUrlWithClient({
        region: process.env.S3_REGION!,
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        bucket: process.env.S3_BUCKET!,
        key: fileName,
      });

      console.log("Presigned URL with client");
      console.log(s3url);

      // Create a new transcript in the database
      const newTranscript = await db.transcript.create({
        data: {
          filename: fileName,
          audioUrl: s3url,
          userId: userId,
        },
      });

      if (!newTranscript) {
        throw new Error("Failed to create transcript");
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error });
  }
}

const createPresignedUrlWithClient = ({
  region,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
}: {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  key: string;
}) => {
  const client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};
