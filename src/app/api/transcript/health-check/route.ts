import {
  getUnhealthyTranscript,
  startTranscription,
} from "@/transcription-service/transcription-service";
import { type NextRequest } from "next/server";
import { checkApiKey } from "../security";

export async function GET(request: NextRequest) {
  checkApiKey(request);

  try {
    const unhealthyTranscripts = await getUnhealthyTranscript();

    if (unhealthyTranscripts.length > 0) {
      await startTranscription({
        // Send data in new transcription trigger about the first unhealthy transcript
        userId: unhealthyTranscripts[0].userId.toString(),
        newTranscriptId: unhealthyTranscripts[0].id,
      });
      return Response.json({
        message: `Found ${unhealthyTranscripts.length} unhealthy transcript(s): ${unhealthyTranscripts.map((t) => t.id)}`,
      });
    }

    return Response.json({ message: "No unhealthy transcripts found." });
  } catch (error) {
    console.error("Error fetching or updating transcript:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
