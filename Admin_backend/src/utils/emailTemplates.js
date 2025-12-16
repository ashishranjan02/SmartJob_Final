export const otpEmailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; color:#333; line-height:1.6;">
      <h2 style="color:#4CAF50;">Email Verification</h2>
      <p>Hello,</p>
      <p>Your One Time Password (OTP) is:</p>
      <h3 style="padding:10px; background:#f4f4f4; display:inline-block; border-radius:5px;">
        ${otp}
      </h3>
      <p>This OTP is valid for <strong>10 minutes</strong>.</p>
      <br/>
      <p>Regards,<br/>Job Portal Team</p>
    </div>
  `;
};
