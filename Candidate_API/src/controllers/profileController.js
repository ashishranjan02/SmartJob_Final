import User from "../models/User.model.js";
// import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../utils/mailer.js";
import Otp from "../models/otp.model.js";


// Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.user.id);

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  View Full Profile
export const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Full Profile

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, linkedin, portfolio, otherLinks, password, email } = req.body;

    console.log("Update Body:", req.body);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    //  Resume upload
    if (req.files?.resume && req.files.resume[0]) {
      const resumeResult = await uploadToCloudinary(req.files.resume[0].buffer, "resumes", "raw");
      user.resume = resumeResult.secure_url;
    }

    // Photo upload
    if (req.files?.photo && req.files.photo[0]) {
      const photoResult = await uploadToCloudinary(req.files.photo[0].buffer, "photos", "image");
      user.photo = photoResult.secure_url;
    }

    //  Basic fields update
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (linkedin) user.linkedin = linkedin;
    if (portfolio) user.portfolio = portfolio;
    if (otherLinks) user.otherLinks = otherLinks;

    //  Password update with validation
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      // Optional: Add strong password rule
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            "Password must include at least one uppercase letter, one number, and one special character",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    //  Email update (OTP process)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Generate OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otp = new Otp({
        email, // Use NEW email
        code: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
      });
      await otp.save();

      // Save pending email in user
      user.pendingEmail = email;
      await user.save();

      // Send OTP to new email
      await sendVerificationEmail(email, otpCode);

      return res.status(200).json({
        message: "OTP sent to new email, please verify.",
        user,
      });
    }

    //Save updated profile
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update Profile error:", error);
    res.status(500).json({ message: error.message });
  }
};
// VERIFY UPDATED EMAIL

export const verifyUpdatedEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    //  Find OTP
    const otp = await Otp.findOne({ email, code });
    if (!otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    //  Find user with pending email
    const user = await User.findOne({ pendingEmail: email });
    if (!user) {
      return res.status(404).json({ message: "User not found or no pending email" });
    }

    //  Update email
    user.email = user.pendingEmail;
    user.pendingEmail = undefined;
    user.isVerified = true;
    await user.save();

    //  Remove OTP after successful verification
    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Email verified successfully", user });
  } catch (error) {
    console.error("Verify Updated Email error:", error);
    res.status(500).json({ message: error.message });
  }
};
