"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Ghost, Download } from "lucide-react";
import { Skeleton } from "@nextui-org/react";
import { format } from "date-fns";
import TranscriptStatusChip from "./TranscriptStatusChip";
import { TranscriptStatus } from "@prisma/client";
import { useState } from "react";
import FileUpload from "../FileUpload";

function Dashboard({ userId }: { userId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useUtils();

  const { mutate: deleteFile } = trpc.deleteTranscript.useMutation({
    onSuccess: () => {
      utils.getUserTranscriptions.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  const { data: transcripts, isLoading } =
    trpc.getUserTranscriptions.useQuery();

  const handleDownload = async (fileName: string) => {
    if (!fileName) return;

    try {
      const formData = new FormData();
      formData.append("fileName", fileName);

      const response = await fetch("/api/s3/downloadFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        window.open(url, "_blank");
      } else {
        throw new Error("Failed to download file");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-auto md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-default-900">
          Meine Transkripte
        </h1>

        <Button onPress={onOpen}>Datei hochladen</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex justify-center">
                  Datei hochladen
                </ModalHeader>
                <ModalBody>
                  <FileUpload userId={userId} />
                </ModalBody>
                <ModalFooter />
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      {/* display all user files */}
      {transcripts && transcripts?.length !== 0 ? (
        <ul className="mt-8 divide-y divide-default-200">
          {transcripts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="divide-y divide-gray-200 rounded-lg bg-default-50 shadow transition hover:shadow-lg mb-4
                "
              >
                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3 justify-between">
                      <h3 className="truncate text-lg font-medium text-default-900">
                        {file.originalFilename}
                      </h3>
                      <TranscriptStatusChip transcriptStatus={file.status} />
                    </div>
                  </div>
                </div>

                <div className="px-6 mt-4 flex items-center py-2 text-xs text-default-500 justify-between">
                  {format(new Date(file.createdAt), "dd.MM.yyyy - HH:mm")}
                  <div className="space-x-2 justify-center flex">
                    {file.status === TranscriptStatus.SUCCESS ? (
                      <>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onClick={() => {
                            handleDownload(file.filename);
                          }}
                        >
                          .docx
                        </Button>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onClick={() => {
                            handleDownload(file.filename);
                          }}
                        >
                          .srt
                        </Button>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onClick={() => {
                            handleDownload(file.filename);
                          }}
                        >
                          .txt
                        </Button>
                      </>
                    ) : null}
                    <Button
                      color="danger"
                      variant="flat"
                      isLoading={currentlyDeletingFile === file.id}
                      onClick={() => deleteFile({ id: file.id })}
                    >
                      Löschen
                    </Button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className="mt-8">
          <Skeleton className="my-2 h-28 rounded-md mb-4" />
          <Skeleton className="my-2 h-28 rounded-md mb-4" />
          <Skeleton className="my-2 h-28 rounded-md mb-4" />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-default-800" />
          <h3 className="font-semibold text-xl">
            Es ist noch ziemlich leer hier
          </h3>
          <p>Lass uns dein erstes Video hochladen</p>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
