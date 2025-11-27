
import nodemailer from "nodemailer";

/**
 * Send email using Nodemailer
 * @param {String} to - Recipient email
 * @param {String} subject - Email subject
 * @param {String} html - Email body in HTML
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("sendEmail error:", err);
    throw new Error("Failed to send email");
  }
};
