import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message, isHtml = false) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      [isHtml ? "html" : "text"]: message, // 
    };

    await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
