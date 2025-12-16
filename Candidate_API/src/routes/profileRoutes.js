import express from "express";
import {
  updateProfile,
  viewProfile,
  deleteProfile,
  verifyUpdatedEmail
} from "../controllers/profileController.js";
import { protect,authorizeRole } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// View Full Profile
router.get("/view-profile", protect, viewProfile);

// Delete Profile
router.delete("/delete-profile", protect, deleteProfile);


// Update profile (needs login)
router.put(
  "/update-profile",
  protect,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  updateProfile
);

router.get(
  "/candidate/dashboard",
  protect,
  authorizeRole(["candidate"]),
  (req, res) => {
    res.json({ message: "Welcome to Candidate Dashboard", user: req.user });
  }
);


// Verify updated email
router.post("/verify-email-update", protect, verifyUpdatedEmail);


export default router;
