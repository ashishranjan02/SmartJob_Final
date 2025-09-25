import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Otp from "../models/otp.model.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { otpEmailTemplate } from "../utils/emailTemplates.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


// REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, linkedin, portfolio, otherLinks } = req.body;

    console.log("Register Body:", req.body);

    //  Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate password BEFORE hashing
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Optional: Strong password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include at least one uppercase letter, one number, and one special character",
      });
    }

    //  Hash password after validation
    const hashedPassword = await bcrypt.hash(password, 10);

    let resumeUrl = null;
    let photoUrl = null;

    //  Upload Resume to Cloudinary
    if (req.files?.resume) {
      const resumeResult = await uploadToCloudinary(
        req.files.resume[0].buffer,
        "resumes",
        "raw"
      );
      resumeUrl = resumeResult.secure_url;
    }

    // Upload Photo to Cloudinary
    if (req.files?.photo) {
      const photoResult = await uploadToCloudinary(
        req.files.photo[0].buffer,
        "photos",
        "image"
      );
      photoUrl = photoResult.secure_url;
    }

    //  Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      linkedin,
      portfolio,
      otherLinks,
      resume: resumeUrl,
      photo: photoUrl,
    });

    //  Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = new Otp({
      email,
      code: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
    });
    await otp.save();

    // Send OTP email
    await sendEmail(email, "Verify Your Email - OTP", otpEmailTemplate(otpCode), true);

    res.status(201).json({
      message: "Next step, Please verify OTP.",
      user,
    });
  } catch (error) {
    console.error("Register error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation failed Please check your email address", errors });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
//  Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    const otp = await Otp.findOne({ email, code });
    if (!otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await User.findOneAndUpdate({ email }, { isVerified: true });
    await Otp.deleteMany({ email }); // remove old OTPs

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
