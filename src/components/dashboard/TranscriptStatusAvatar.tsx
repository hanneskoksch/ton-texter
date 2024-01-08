"use client";

import { Tooltip } from "@nextui-org/react";
import { TranscriptStatus } from "@prisma/client";
import { Loader2, Check, X } from "lucide-react";

function TranscriptStatusAvatar({
  transcriptStatus,
}: {
  transcriptStatus: TranscriptStatus;
}) {
  switch (transcriptStatus) {
    case "PENDING":
      return (
        <Tooltip content="Ausstehend" placement="right">
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gradient-to-r from-default-400 to-default-600">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        </Tooltip>
      );
    case "PROCESSING":
      return (
        <Tooltip content="Verarbeitung" placement="right">
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gradient-to-r from-default-400 to-default-600">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        </Tooltip>
      );
    case "FAILED":
      return (
        <Tooltip content="Fehlgeschlagen" placement="right">
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gradient-to-r from-red-400 to-red-600">
            <X className="h-6 w-6 text-white" />
          </div>
        </Tooltip>
      );
    case "SUCCESS":
      return (
        <Tooltip content="Erfolgreich" placement="right">
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gradient-to-r from-green-400 to-green-600">
            <Check className="h-6 w-6 text-white" />
          </div>
        </Tooltip>
      );
  }
}

export default TranscriptStatusAvatar;