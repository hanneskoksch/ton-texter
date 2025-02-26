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

/**
 * Generates a pre-signed URL for downloading an object from S3.
 *
 * @param key - The S3 object key.
 * @returns A pre-signed URL valid for 300 seconds.
 */
export const createPresignedUrl = ({ key }: { key: string }) => {
  const client = createS3Client();
  const bucket = process.env.S3_BUCKET;
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 300 });
};

/**
 * Generates a pre-signed URL for uploading an object to S3.
 *
 * @param key - The S3 object key.
 * @returns A pre-signed URL valid for 300 seconds.
 */
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
 * Deletes multiple objects from an S3 bucket.
 *
 * This function:
 * - Deletes files associated with the given transcripts, including additional
 *   file extensions (.docx, .srt, .txt).
 * - Logs any errors encountered during deletion.
 *
 * @param transcripts - Array of transcript objects containing file details.
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

/**
 * Deletes an original audio file from an S3 bucket.
 *
 * This function:
 * - Attempts to delete the specified object from S3.
 * - Logs success or failure messages.
 *
 * @param key - The S3 object key of the original audio file.
 */
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
    logMessage(`Failed to delete S3 object:\n${err}`, "Error");
  }
};
