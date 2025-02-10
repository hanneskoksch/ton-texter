import { Progress } from "@heroui/react";

interface IProps {
  speakerDiarizationProgress: number;
  transcriptionProgress: number;
}

function TranscriptProgressBar({
  speakerDiarizationProgress,
  transcriptionProgress,
}: IProps) {
  return (
    <div className="flex overflow-hidden rounded-b">
      <Progress
        value={speakerDiarizationProgress + transcriptionProgress}
        maxValue={200}
        radius="none"
        size="sm"
      />
    </div>
  );
}

export default TranscriptProgressBar;
