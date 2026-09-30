import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      company,
      designation,
      interest,
      message,
    } = body;

    // 1. Validate Required Fields
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Please provide all required information." },
        { status: 400 },
      );
    }

    // 2. Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // 3. Force Lead Source Server-Side
    const leadSource = "Contact Page";
    const finalInterest = interest || "Not specified";

    // 4. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: "New Contact Page Enquiry - London School of Higher Studies",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #001B30; padding: 20px 24px; border-bottom: 4px solid #f4d210;">
            <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Contact Enquiry</h2>
          </div>
          
          <div style="padding: 24px;">
            <div style="background-color: #f8f9fa; border-left: 4px solid #0B73B9; padding: 12px 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #001B30;">Lead Source</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #0B73B9;">${leadSource}</p>
            </div>

            <h3 style="color: #001B30; font-size: 16px; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 8px;">Contact Information</h3>
            <p style="margin: 0 0 12px 0;"><strong>First Name:</strong><br>${firstName}</p>
            <p style="margin: 0 0 12px 0;"><strong>Last Name:</strong><br>${lastName}</p>
            <p style="margin: 0 0 12px 0;"><strong>Email:</strong><br><a href="mailto:${email}" style="color: #0B73B9; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 12px 0;"><strong>Phone:</strong><br>${phone}</p>

            <h3 style="color: #001B30; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Location</h3>
            <p style="margin: 0 0 12px 0;"><strong>Country:</strong><br>${country || "Not specified"}</p>
            <p style="margin: 0 0 12px 0;"><strong>City / Area / Postcode:</strong><br>${city || "Not specified"}</p>

            <h3 style="color: #001B30; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Professional Information</h3>
            <p style="margin: 0 0 12px 0;"><strong>Company:</strong><br>${company || "Not specified"}</p>
            <p style="margin: 0 0 12px 0;"><strong>Designation:</strong><br>${designation || "Not specified"}</p>
            <p style="margin: 0 0 12px 0;"><strong>Interest:</strong><br>${finalInterest}</p>

            <h3 style="color: #001B30; font-size: 16px; margin-top: 24px; border-bottom: 1px solid #eee; padding-bottom: 8px;">Message</h3>
            <p style="margin: 0 0 12px 0; white-space: pre-wrap; background: #f8f9fa; padding: 12px; border-radius: 6px;">${message}</p>
            
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
        { success: true, message: "Contact enquiry sent successfully." },
        { status: 200 },
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { success: false, message: "Unable to send your enquiry." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send your enquiry." },
      { status: 500 },
    );
  }
}
