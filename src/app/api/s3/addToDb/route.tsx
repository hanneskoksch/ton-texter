import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userId = data.get("userId") as string;
    const fileName = data.get("fileName") as string;
    const fileNameWithUuid = data.get("fileNameWithUuid") as string;
    const fileExtension = data.get("fileExtension") as string;

    if (!userId) {
      return NextResponse.error();
    }

    // Create a new transcript in the database
    const newTranscript = await db.transcript.create({
      data: {
        fileName: fileNameWithUuid,
        fileExtension: fileExtension,
        fileNameWithExt: `${fileNameWithUuid}${fileExtension}`,
        displayFilename: `${fileName}${fileExtension}`,
        userId: userId,
      },
    });

    if (!newTranscript) {
      throw new Error("Failed to create transcript");
    }

    // Start transcription
    fetch(
      `https://hzjgd3yz9g.execute-api.eu-central-1.amazonaws.com/dev/start_transcription?key=${process.env.TRANSCRIPTION_SERVICE_API_KEY}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error();
  }
}
