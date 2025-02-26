import { NextRequest } from "next/server";

/**
 * Validates the API key for communication with the transcription service.
 * @param request - The incoming request object.
 * @returns A `Response` object with an error message if authentication fails, otherwise `true`.
 */
export const checkApiKey = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get("key");

  if (!apiKey) {
    return new Response("No API key provided.", { status: 401 });
  }

  if (process.env.TRANSCRIPTION_SERVICE_API_KEY !== apiKey) {
    return new Response("Invalid API key.", { status: 401 });
  }

  // API key is valid
  return true;
};
