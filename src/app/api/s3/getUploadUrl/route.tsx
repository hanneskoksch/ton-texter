import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createPresignedUploadUrl } from "@/lib/s3/utils";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userId = data.get("userId") as string;
    const file = data.get("fileName") as string;

    if (!file || !userId) {
      return NextResponse.error();
    }

    // separate filename from file extension
    const indexOfLastDot = file.lastIndexOf(".");
    let fileName = file.slice(0, indexOfLastDot);
    const fileExtension = file.slice(indexOfLastDot);

    // reduce length of filename to 200 characters
    if (fileName.length > 200) {
      fileName = fileName.substring(0, 200);
    }

    // create file name with a random uuid and the file extension
    const fileNameWithUuid = `${fileName}-${randomUUID()}`;

    const s3UploadUrl = await createPresignedUploadUrl({
      key: fileNameWithUuid,
    });

    return NextResponse.json({
      success: true,
      url: s3UploadUrl,
      fileName,
      fileNameWithUuid: fileNameWithUuid,
      fileExtension,
    });
  } catch (error) {
    return NextResponse.error();
  }
}
