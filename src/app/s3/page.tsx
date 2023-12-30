"use client";
import { useState } from "react";
import { Button, CircularProgress, Spacer } from "@nextui-org/react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const UploadToS3 = () => {
  const [file, setFile] = useState<File | null>(null);
  const [highlighted, setHighlighted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadSuccess(false);
      setUploadError(false);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setUploadSuccess(false);
      setUploadError(false);
    }
    setHighlighted(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setHighlighted(true);
  };

  const handleDragLeave = () => {
    setHighlighted(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const client = new S3Client({
      region: process.env.NEXT_PUBLIC_S3_REGION!,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      Key: file.name,
      Body: file,
    });

    try {
      const response = await client.send(command);
      console.log("File uploaded successfully:", response);
      setFile(null);
      setUploadSuccess(true);
      setUploadError(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError(true);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <div
        className={`border-dashed border-4 ${
          highlighted ? "border-blue-500" : "border-gray-400"
        } p-6 text-center cursor-pointer`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-lg">Drag & Drop a file here or</p>
        <Button
          className="m-4"
          color="primary"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Click to Browse
        </Button>
      </div>
      {uploadSuccess && (
        <p className="text-green-600 m-4">File uploaded successfully!</p>
      )}
      {uploadError && (
        <p className="text-red-600 m-4">
          Error uploading file. Please try again.
        </p>
      )}
      {file && (
        <div className="mt-4">
          <p className="text-lg">Selected File: {file.name}</p>
          <Spacer y={1} />
          <Button
            disabled={uploading}
            onClick={handleUpload}
            isLoading={uploading}
          >
            {uploading ? "Uploading..." : "Upload to AWS S3"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadToS3;
