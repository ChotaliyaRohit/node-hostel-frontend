import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const dob = formData.get("dob") as string;

    const adhar = formData.get("adhar") as File | null;
    const student = formData.get("student") as File | null;

    // Save adhar card
    if (adhar) {
      const bytes = Buffer.from(await adhar.arrayBuffer());
      const adharPath = path.join(process.cwd(), "public/images/adhar_card", adhar.name);
      await writeFile(adharPath, bytes);
    }

    // Save student photo
    if (student) {
      const bytes = Buffer.from(await student.arrayBuffer());
      const studentPath = path.join(process.cwd(), "public/images/student_photo", student.name);
      await writeFile(studentPath, bytes);
    }

    return NextResponse.json({ success: true, message: "Student saved successfully!" });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Failed to upload student" }, { status: 500 });
  }
}
