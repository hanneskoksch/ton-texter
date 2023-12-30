import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;
    if (!file) {
      return NextResponse.json({ success: false });
    }

    const client = new S3Client({
      region: process.env.S3_REGION!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });

    const Body = (await file.arrayBuffer()) as Buffer;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: file.name,
      Body,
    });

    const response = await client.send(command);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
