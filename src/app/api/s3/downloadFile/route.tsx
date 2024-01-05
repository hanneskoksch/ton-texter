import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileName = data.get("fileName") as string;

    if (!fileName) {
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

    // Create presigned url
    const s3Url = await createPresignedUrlWithClient({
      client: client,
      bucket: process.env.S3_BUCKET!,
      key: fileName,
    });

    return NextResponse.json({ success: true, url: s3Url });
  } catch (error) {
    return NextResponse.error();
  }
}

const createPresignedUrlWithClient = ({
  client,
  bucket,
  key,
}: {
  client: S3Client;
  bucket: string;
  key: string;
}) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 300 });
};
