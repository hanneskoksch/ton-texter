import { db } from "@/db";
import { logQueueMetrics } from "@/lib/cloudwatch/utils";

export async function sendQueueMetricsToCloudwatch() {
  try {
    const result = await db.transcript.aggregate({
      _count: { id: true },
      _sum: { audioDuration: true },
      where: { status: "PENDING" },
    });

    const allPendingTranscriptsCount = result._count.id || 0;
    const allPendingTranscriptsDuration = result._sum.audioDuration || 0;

    await logQueueMetrics(
      allPendingTranscriptsCount,
      allPendingTranscriptsDuration,
    );
  } catch (error) {
    console.error("Error processing metric or sending CloudWatch data:", error);
  }
}
