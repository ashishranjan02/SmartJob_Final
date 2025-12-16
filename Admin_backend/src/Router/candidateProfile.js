import express from "express";
import {
  updateProfile,
  viewProfile,
  deleteProfile,
  verifyUpdatedEmail
} from "../Controller/Candidate.Profile.Controller.js";
import { protect,authorizeRole } from "../Middleware/Candidate.Middleware.js";
import upload from "../Middleware/upload.Middleware.js";

const router = express.Router();

// View Full Profile
router.get("/view-profile", protect, viewProfile);

// Delete Profile
router.delete("/delete", protect, deleteProfile);


// Update profile (needs login)
router.put(
  "/update",
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
