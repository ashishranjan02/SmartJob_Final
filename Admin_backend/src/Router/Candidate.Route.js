import express from "express";
import upload from "../Middleware/upload.Middleware.js"
import { register, verifyOtp, login } from "../Controller/Candidate.Controller.js";


const candidateRouter = express.Router();

// Register route with file uploads
candidateRouter.post(
  "/register",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  register
);

candidateRouter.post("/verify-otp", verifyOtp);
candidateRouter.post("/login", login);

export default candidateRouter;

