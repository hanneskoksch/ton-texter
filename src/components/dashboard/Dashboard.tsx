"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { TranscriptStatus } from "@prisma/client";
import { format } from "date-fns";
import { Download, Ghost, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { Key, useEffect, useState } from "react";
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

  useEffect(() => {
    // refetch every 10 seconds if there are still processing or pending transcripts
    const refetchIntervalId = setInterval(() => {
      if (
        transcripts?.some(
          (transcript) =>
            transcript.status === TranscriptStatus.PENDING ||
            transcript.status === TranscriptStatus.FORWARDED ||
            transcript.status === TranscriptStatus.PROCESSING ||
            transcript.status === TranscriptStatus.SPEAKER_DIARIZATION ||
            transcript.status === TranscriptStatus.TRANSCRIPTION,
        )
      ) {
        utils.getUserTranscriptions.invalidate();
      }
    }, 10000);

    return () => clearInterval(refetchIntervalId);
  }, [utils.getUserTranscriptions, transcripts]);

  const { mutate: transcriptDownload } = trpc.donwloadTranscript.useMutation({
    onSuccess: (transcriptDownload) => {
      window.open(transcriptDownload, "_blank");
    },
  });

  const handleMoreMenuSelect = (key: Key, fileId: string) => {
    switch (key) {
      case "delete":
        deleteFile({ id: fileId });
        return;
      default:
        return;
    }
  };

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
                  <div className="rounded-xl border-2 border-default-300 bg-default-100 p-4">
                    <p className="text-small text-default-600">
                      Um die Uploadgröße zu reduzieren und die Geschwindigkeit
                      zu erhöhen, empfehlen wir, große Videos vor dem Upload in
                      Audiodateien umzuwandeln.
                      <br />
                      Dafür empfehlen wir z. B. das Tool{" "}
                      <Link
                        isExternal
                        showAnchorIcon
                        className="text-small"
                        href="https://www.ffmpeg.org/"
                      >
                        FFmpeg
                      </Link>
                      .
                    </p>
                  </div>
                  <FileUpload />
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
                className="mb-4 divide-y divide-gray-200 rounded-lg bg-default-50 shadow transition hover:shadow-lg"
              >
                <div className="px-2 pt-2 md:px-6 md:pt-6">
                  <Accordion isCompact>
                    <AccordionItem
                      isDisabled={file.status !== TranscriptStatus.SUCCESS}
                      hideIndicator={file.status !== TranscriptStatus.SUCCESS}
                      className="pointer-events-auto opacity-100"
                      startContent={
                        <TranscriptStatusAvatar
                          transcriptStatus={file.status}
                        />
                      }
                      aria-label="Vorschau"
                      title={
                        <h3 className="break-all text-lg font-medium text-default-900">
                          {file.displayFilename}
                        </h3>
                      }
                    >
                      <p className="italic text-default-600">
                        {file.preview}...
                      </p>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="mt-4 px-6 py-2 text-right text-xs text-default-500 md:flex md:items-center md:justify-between">
                  <div className="my-1">
                    {format(new Date(file.createdAt), "dd.MM.yyyy - HH:mm")}
                  </div>
                  <div className="flex justify-end space-x-2 md:justify-center">
                    {file.status === TranscriptStatus.SUCCESS ? (
                      <>
                        <Button
                          color="primary"
                          variant="flat"
                          startContent={<Download className="h-4 w-4" />}
                          onPress={() => {
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
                          onPress={() => {
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
                          onPress={() => {
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
                    <Dropdown closeOnSelect={false}>
                      <DropdownTrigger>
                        <Button isIconOnly color="default" variant="flat">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="faded"
                        aria-label="Mehr Aktionen"
                        disabledKeys={
                          file.status === TranscriptStatus.FORWARDED ||
                          file.status === TranscriptStatus.PROCESSING ||
                          file.status ===
                            TranscriptStatus.SPEAKER_DIARIZATION ||
                          file.status === TranscriptStatus.TRANSCRIPTION ||
                          currentlyDeletingFile === file.id
                            ? ["delete"]
                            : []
                        }
                        onAction={(key) => handleMoreMenuSelect(key, file.id)}
                      >
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          description={
                            file.status !== TranscriptStatus.PROCESSING
                              ? "Datei wird unwiderruflich gelöscht"
                              : "Nur möglich, wenn Datei nicht verarbeitet wird"
                          }
                          startContent={
                            currentlyDeletingFile === file.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )
                          }
                        >
                          Löschen
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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
