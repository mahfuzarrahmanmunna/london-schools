import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    // 1. Validate Required Fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Please provide valid information." },
        { status: 400 },
      );
    }

    // 2. Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide valid information." },
        { status: 400 },
      );
    }

    // 3. Force Lead Source Server-Side (Do not trust frontend)
    const leadSource = "CTA Section";

    // 4. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5. Prepare Professional HTML Email
    const submissionTime = new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const mailOptions = {
      from: `"LSHS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ENQUIRY_RECEIVER_EMAIL,
      subject: "New CTA Lead - London School of Higher Studies",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #001B30; padding: 20px 24px; border-bottom: 4px solid #f4d210;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New CTA Enquiry</h2>
          </div>
          
          <div style="padding: 24px;">
            <div style="background-color: #f8f9fa; border-left: 4px solid #0B73B9; padding: 12px 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #001B30;">Lead Source</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #0B73B9;">${leadSource}</p>
            </div>

            <h3 style="color: #001B30; font-size: 16px; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 8px;">Contact Information</h3>
            
            <p style="margin: 0 0 12px 0;"><strong>Name:</strong><br>${name}</p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong><br><a href="mailto:${email}" style="color: #0B73B9; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 12px 0;"><strong>Phone:</strong><br>${phone}</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="margin: 0; font-size: 12px; color: #666;"><strong>Submitted At:</strong><br>${submissionTime}</p>
          </div>
        </div>
      `,
    };

    // 6. Send Email
    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json(
        { success: true, message: "Enquiry sent successfully." },
        { status: 200 },
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { success: false, message: "Unable to send enquiry." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send enquiry." },
      { status: 500 },
    );
  }
}
