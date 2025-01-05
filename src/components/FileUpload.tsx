"use client";
import { trpc } from "@/app/_trpc/client";
import { Button, Spacer } from "@nextui-org/react";
import { useState } from "react";

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

  const utils = trpc.useUtils();

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

  const { mutate: createTranscription } = trpc.createTranscription.useMutation({
    onSuccess: () => {
      utils.getUserTranscriptions.invalidate();
      setFile(null);
      setUploadSuccess(true);
      setUploadError(false);
      setUploading(false);
    },
    onError: () => {
      setUploadError(true);
      setUploadSuccess(false);
      setUploading(false);
    },
  });

  async function uploadToS3(url: string, file: File) {
    "use client";
    const uploadResponse = await fetch(url, {
      method: "PUT",
      body: file,
    });
    return uploadResponse;
  }

  const { mutate: createUploadUrl } = trpc.createUploadUrl.useMutation({
    onSuccess: async ({ url, fileName, fileNameWithUuid, fileExtension }) => {
      if (!file) return;
      const uploadResponse = await uploadToS3(url, file);

      if (!uploadResponse.ok) throw new Error("Failed to upload file to s3");

      createTranscription({
        fileName,
        fileNameWithUuid,
        fileExtension,
      });
    },
    onError: () => {
      setUploadError(true);
      setUploadSuccess(false);
      setUploading(false);
    },
  });

  const handleUpload = async () => {
    setUploading(true);
    if (!file) return;

    createUploadUrl({
      fileName: file.name,
    });
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <div
        className={`border-4 border-dashed ${
          highlighted ? "border-primary" : "border-default"
        } cursor-pointer p-6 text-center`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".mp3,audio/*"
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
        <p className="m-4 text-success">Datei erfolgreich hochgeladen!</p>
      )}
      {uploadError && (
        <p className="m-4 text-danger">
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
