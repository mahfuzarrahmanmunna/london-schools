import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email } = body;

    // 1. Validate Request Method
    if (req.method !== "POST") {
      return NextResponse.json(
        { success: false, message: "Method not allowed." },
        { status: 405 },
      );
    }

    // 2. Validate Required Fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 },
      );
    }

    // 3. Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format." },
        { status: 400 },
      );
    }

    // 4. Configure Nodemailer Transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail", // This forces Nodemailer to use Gmail's SMTP servers automatically
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5. Prepare Email Content
    const mailOptions = {
      from: `"LSHS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.BROCHURE_RECEIVER_EMAIL,
      subject: "New Brochure Request - London School of Higher Studies",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 24px;">
          <h2 style="color: #001B30; border-bottom: 2px solid #f4d210; padding-bottom: 12px; margin-top: 0;">
            New Brochure Request
          </h2>
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="font-size: 14px; color: #666; margin-bottom: 0;">
            The user has requested the CIPS course brochure. Please follow up with them at your earliest convenience.
          </p>
        </div>
      `,
    };

    // 6. Send Email
    try {
      await transporter.sendMail(mailOptions);

      // 7. Return Success Response
      return NextResponse.json(
        { success: true, message: "Brochure request submitted successfully." },
        { status: 200 },
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process your request. Please try again.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}
