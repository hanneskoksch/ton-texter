import { logMessage } from "@/lib/cloudwatch-logs/utils";
import {
  getUnhealthyTranscript,
  startTranscription,
} from "@/transcription-service/transcription-service";
import { type NextRequest } from "next/server";
import { checkApiKey } from "../security";

/**
 * Handles a GET request to check for unhealthy transcripts and start transcription.
 *
 * This function:
 * - Checks the API key for authentication.
 * - Retrieves unhealthy transcripts.
 * - If any are found, triggers transcription for the first unhealthy transcript.
 * - Returns a response indicating the number of unhealthy transcripts found or that none exist.
 * - Logs any errors encountered.
 *
 * @param request - The incoming request object.
 * @returns A JSON response with a message about the processing result.
 */
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
    logMessage("Error fetching or updating transcript:\n" + error, "Error");
    return new Response("Internal Server Error", { status: 500 });
  }
}
