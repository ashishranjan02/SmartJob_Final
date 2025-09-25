import express from "express";
import { protect, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/candidate/dashboard",
  protect,
  authorizeRole(["candidate"]),
  (req, res) => {
    res.json({ message: "Welcome to Candidate Dashboard", user: req.user });
  }
);

router.get(
  "/recruiter/dashboard",
  protect,
  authorizeRole(["recruiter"]),
  (req, res) => {
    res.json({ message: "Welcome to Recruiter Dashboard", user: req.user });
  }
);

router.get(
  "/admin/dashboard",
protect,
  authorizeRole(["candidate"]),
  (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard", user: req.user });
  }
);

export default router;
