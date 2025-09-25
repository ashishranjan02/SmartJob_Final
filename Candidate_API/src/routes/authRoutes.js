import express from "express";
import upload from "../middlewares/uploadMiddleware.js"
import { register, verifyOtp, login } from "../controllers/authController.js";


const router = express.Router();

// Register route with file uploads
router.post(
  "/register",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  register
);

router.post("/verify-otp", verifyOtp);
router.post("/login", login);

export default router;

