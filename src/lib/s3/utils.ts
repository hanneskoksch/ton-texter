import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const createPresignedUrl = ({ key }: { key: string }) => {
  const client = createS3Client();
  const bucket = process.env.S3_BUCKET;
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 300 });
};

export const createPresignedUploadUrl = ({ key }: { key: string }) => {
  const client = createS3Client();
  const bucket = process.env.S3_BUCKET;
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 300 });
};

const createS3Client = () => {
  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
};

export const deleteS3Objects = async ({
  key,
  fileExtension,
}: {
  key: string;
  fileExtension: string;
}) => {
  const client = createS3Client();
  const bucket = process.env.S3_BUCKET;
  const fileExtensions = [fileExtension, ".docx", ".srt", ".txt"];

  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: fileExtensions.map((extension) => ({
        Key: `${key}${extension}`,
      })),
    },
  });

  await client.send(command);
};

export const deleteS3OriginalAudio = async ({ key }: { key: string }) => {
  const client = createS3Client();
  const bucket = process.env.S3_BUCKET;

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
