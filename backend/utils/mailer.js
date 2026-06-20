const nodemailer = require("nodemailer");

// 1. Transporter configuration using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "tuzha-email@gmail.com",
    pass: process.env.EMAIL_PASS || "tuzha-app-password",
  },
});

// 2. Generic Function to send Email
const sendEmail = async (to, subject, content) => {
  try {
    const isHtml = content.trim().startsWith("<") || content.includes("\n");
    const mailOptions = {
      from: `"P.R. Pote Patil College" <${process.env.EMAIL_USER || "tuzha-email@gmail.com"}>`,
      to: to,
      subject: subject,
      [isHtml ? "html" : "text"]: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("❌ Email Error:", error);
    // Silent catch so it doesn't crash the server request if SMTP configuration is wrong
    return null;
  }
};

// Resolution helper (retains structural parity with previous exports)
const sendResolutionEmail = async (studentEmail, studentName, complaintId) => {
  const mailSubject = "Complaint Resolved - P.R. Pote Patil College";
  const mailBody = `
    <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #4CAF50;">Hello ${studentName},</h2>
      <p>Your complaint with ID <b>${complaintId}</b> has been successfully <b>Resolved</b> by the HOD.</p>
      <p>Thank you for your patience.</p>
      <hr>
      <p style="font-size: 12px; color: #777;">This is an automated message from the College Complaint System.</p>
    </div>
  `;
  return sendEmail(studentEmail, mailSubject, mailBody);
};

module.exports = sendEmail;
module.exports.sendResolutionEmail = sendResolutionEmail;