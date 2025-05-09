import { NextRequest, NextResponse } from "next/server";
import { uploadCarImages } from "@/utils/car-images";
import { getUser } from "@/app/actions";

export async function POST(req: NextRequest) {
  try {
    // Verify user authentication
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    // Get FormData from request
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    try {
      // Upload files using the existing utility
      const urls = await uploadCarImages(files);

      // Return successful response
      return NextResponse.json({ urls, error: null });
    } catch (error: any) {
      console.error("Error uploading images:", error);
      return NextResponse.json(
        { error: error.message || "Failed to upload images" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error in upload API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
