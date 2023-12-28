"use client"
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const UploadToS3 = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    console.log('Uploading file to AWS S3...');
    if (!file) return;

    const fileName = file.name;

    const client = new S3Client({
      region: "",
      credentials: {
        accessKeyId: "",
        secretAccessKey: "",
      },
    });

    const bucketName = ""; 

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file,
    });

    try {
      const response = await client.send(command);
      console.log('File uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <div>
          <p>Selected File: {file.name}</p>
          <Button onClick={handleUpload}>Upload to AWS S3</Button>
        </div>
      )}
    </div>
  );
};

export default UploadToS3;
