const nodemailer = require("nodemailer");

// 1. Transporter configuration (Practical 10)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tuzha-email@gmail.com", // Tuzha Gmail ID ithe taka
    pass: "tuzha-app-password",    // Gmail cha 'App Password' ithe taka
  },
});

// 2. Function to send Email
const sendResolutionEmail = async (studentEmail, studentName, complaintId) => {
  try {
    const mailOptions = {
      from: '"P.R. Pote Patil College" <tuzha-email@gmail.com>',
      to: studentEmail,
      subject: "Complaint Resolved - P.R. Pote Patil College",
      html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #4CAF50;">Hello ${studentName},</h2>
          <p>Your complaint with ID <b>${complaintId}</b> has been successfully <b>Resolved</b> by the HOD.</p>
          <p>Thank you for your patience.</p>
          <hr>
          <p style="font-size: 12px; color: #777;">This is an automated message from the College Complaint System.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);
  } catch (error) {
    console.error("❌ Email Error:", error);
  }
};

module.exports = { sendResolutionEmail };