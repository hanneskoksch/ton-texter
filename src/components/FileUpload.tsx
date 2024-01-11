"use client";
import { useState } from "react";
import { Button, Spacer } from "@nextui-org/react";

interface FileUploadProps {
  userId: string;
}

function isAudioFile(file: File) {
  return file.type.startsWith("audio/");
}

const FileUpload: React.FC<FileUploadProps> = ({ userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [highlighted, setHighlighted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && isAudioFile(selectedFile)) {
      setFile(selectedFile);
      setUploadSuccess(false);
      setUploadError(false);
    } else {
      setFile(null);
      setUploadSuccess(false);
      setUploadError(true);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && isAudioFile(droppedFile)) {
      setFile(droppedFile);
      setUploadSuccess(false);
      setUploadError(false);
    } else {
      setFile(null);
      setUploadSuccess(false);
      setUploadError(true);
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

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("fileName", file.name);
      formData.append("userId", userId);

      const getUploadUrlResponse = await fetch("/api/s3/getUploadUrl", {
        method: "POST",
        body: formData,
      });

      if (!getUploadUrlResponse.ok) throw new Error("Failed to upload file");

      const { url, fileName, fileNameWithUuid, fileExtension } =
        await getUploadUrlResponse.json();

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload file");

      const formDataForDb = new FormData();
      formDataForDb.append("fileName", fileName);
      formDataForDb.append("fileNameWithUuid", fileNameWithUuid);
      formDataForDb.append("fileExtension", fileExtension);
      formDataForDb.append("userId", userId);

      const addToDbResponse = await fetch("/api/s3/addToDb", {
        method: "POST",
        body: formDataForDb,
      });

      if (!addToDbResponse.ok) throw new Error("Failed to add to db");

      setFile(null);
      setUploadSuccess(true);
      setUploadError(false);
    } catch (error) {
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
          highlighted ? "border-primary" : "border-default"
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
        <p className="text-lg">Datei hier ablegen oder</p>
        <Button
          className="m-4"
          color="primary"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Datei auswählen
        </Button>
      </div>
      {uploadSuccess && (
        <p className="text-success m-4">Datei erfolgreich hochgeladen!</p>
      )}
      {uploadError && (
        <p className="text-danger m-4">
          {!file
            ? "Bitte wähle eine Audiodatei aus (z.B. mp3, wav, ogg)."
            : "Fehler beim Hochladen der Datei. Bitte versuche es erneut."}
        </p>
      )}

      {file && (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-md mb-2">Ausgewählte Datei: {file.name}</p>
          <Spacer y={1} />
          <Button
            color="primary"
            disabled={uploading}
            onClick={handleUpload}
            isLoading={uploading}
          >
            {uploading ? "Hochladen..." : "Hochladen"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
