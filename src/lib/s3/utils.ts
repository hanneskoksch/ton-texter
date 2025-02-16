import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Transcript } from "@prisma/client";
import { logMessage } from "../cloudwatch-logs/utils";

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

/**
 * Deletes objects from S3
 * @param keys - Array of keys to delete
 * @param fileExtension - Additional original audio file extensions to delete
 * (in case the transcription failed and the file has not been deleted due to the transcription done event)
 */
export const deleteS3Objects = async (transcripts: Transcript[]) => {
  if (!transcripts.length) return;

  const client = createS3Client();
  const bucket = process.env.S3_BUCKET;
  const transcriptFileExtensions = [".docx", ".srt", ".txt"];

  const command = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: transcripts
        .map((transcript) => {
          const fileExtensions = [
            transcript.fileExtension,
            ...transcriptFileExtensions,
          ];
          return fileExtensions.map((ext) => ({
            Key: `${transcript.fileName}${ext}`,
          }));
        })
        .flat(),
    },
  });

  const response = await client.send(command);

  if (response.Errors) {
    logMessage(`Failed to delete S3 objects: ${response.Errors}`, "Error");
    return;
  }

  if (response.Deleted) {
    const deletedKeys = response.Deleted.map((d) => d.Key);
    logMessage(`Deleted S3 objects: ${deletedKeys}`, "Info");
  }
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
    logMessage(`Deleted S3 object: ${response}`, "Info");
  } catch (err) {
    console.error(err);
  }
};
