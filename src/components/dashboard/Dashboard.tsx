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
  Tooltip,
} from "@nextui-org/react";
import { Ghost, Download } from "lucide-react";
import { Skeleton } from "@nextui-org/react";
import { format } from "date-fns";
import { TranscriptStatus } from "@prisma/client";
import { useState } from "react";
import FileUpload from "../FileUpload";
import TranscriptStatusAvatar from "./TranscriptStatusAvatar";

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

  const { mutate: transcriptDownload } = trpc.donwloadTranscript.useMutation({
    onSuccess: (transcriptDownload) => {
      window.open(transcriptDownload, "_blank");
    },
  });

  return (
    <main className="mx-auto md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-default-900">
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
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <li
                key={file.id}
                className="mb-4 divide-y divide-gray-200 rounded-lg bg-default-50 shadow transition hover:shadow-lg
                "
              >
                <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                  <TranscriptStatusAvatar transcriptStatus={file.status} />
                  <div className="flex-1 truncate">
                    <div>
                      <h3 className="truncate text-lg font-medium text-default-900">
                        {file.displayFilename}
                      </h3>
                      <Tooltip
                        placement="bottom-start"
                        content={
                          <article className="prose dark:prose-invert">
                            {file.preview}
                          </article>
                        }
                      >
                        <p className="truncate italic text-default-600 ">
                          {file.preview}
                        </p>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-6 py-2 text-xs text-default-500">
                  {format(new Date(file.createdAt), "dd.MM.yyyy - HH:mm")}
                  <div className="flex justify-center space-x-2">
                    {file.status === TranscriptStatus.SUCCESS ? (
                      <>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onClick={() => {
                            transcriptDownload({
                              fileName: file.fileName,
                              fileExtension: ".docx",
                            });
                          }}
                        >
                          .docx
                        </Button>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onClick={() => {
                            transcriptDownload({
                              fileName: file.fileName,
                              fileExtension: ".srt",
                            });
                          }}
                        >
                          .srt
                        </Button>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onClick={() => {
                            transcriptDownload({
                              fileName: file.fileName,
                              fileExtension: ".txt",
                            });
                          }}
                        >
                          .txt
                        </Button>
                      </>
                    ) : null}
                    <Tooltip
                      isDisabled={file.status !== TranscriptStatus.PROCESSING}
                      content={
                        "Dateien können nicht gelöscht werden, während sie verarbeitet werden."
                      }
                    >
                      <div>
                        <Button
                          color="danger"
                          variant="flat"
                          isDisabled={
                            file.status === TranscriptStatus.PROCESSING
                          }
                          isLoading={currentlyDeletingFile === file.id}
                          onClick={() => deleteFile({ id: file.id })}
                        >
                          Löschen
                        </Button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className="mt-8">
          <Skeleton className="my-2 mb-4 h-28 rounded-md" />
          <Skeleton className="my-2 mb-4 h-28 rounded-md" />
          <Skeleton className="my-2 mb-4 h-28 rounded-md" />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-default-800" />
          <h3 className="text-xl font-semibold">
            Es ist noch ziemlich leer hier
          </h3>
          <p>Lass uns dein erstes Video hochladen</p>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
