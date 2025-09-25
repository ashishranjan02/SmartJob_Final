import sendEmail from "./sendEmail.js";
import { otpEmailTemplate } from "./emailTemplates.js";

// wrapper function for OTP verification mails
export const sendVerificationEmail = async (to, otpCode) => {
  try {
    await sendEmail(
      to,
      "Verify Your Email",
      otpEmailTemplate(otpCode),
      true 
    );
    console.log("Verification email sent to:", to);
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
    throw error;
  }
};
