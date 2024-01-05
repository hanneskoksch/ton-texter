"use client";

import { Chip } from "@nextui-org/react";
import { TranscriptStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";

function TranscriptStatusChip({
  transcriptStatus,
}: {
  transcriptStatus: TranscriptStatus;
}) {
  switch (transcriptStatus) {
    case "PENDING":
      return (
        <Chip
          color="default"
          variant="flat"
          startContent={<Loader2 className="ml-1 h-4 w-4 animate-spin" />}
        >
          Ausstehend
        </Chip>
      );
    case "PROCESSING":
      return (
        <Chip
          color="default"
          variant="flat"
          startContent={<Loader2 className="ml-1 h-4 w-4 animate-spin" />}
        >
          Verarbeitung
        </Chip>
      );
    case "FAILED":
      return (
        <Chip color="danger" variant="flat">
          Fehlgeschlagen
        </Chip>
      );
    case "SUCCESS":
      return (
        <Chip color="success" variant="flat">
          Fertiggestellt
        </Chip>
      );
  }
}

export default TranscriptStatusChip;
