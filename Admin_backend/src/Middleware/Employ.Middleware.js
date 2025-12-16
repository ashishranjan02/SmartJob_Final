import jwt from "jsonwebtoken";
import employ from "../Model/Employ.Model.js";


export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(403).json({ message: "No token provided" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || secretkey);

    const foundUser = await employ.findOne({
      $or: [
        { recruiterId: decoded.recruiterId },
        { adminId: decoded.adminId },
        { _id: decoded.id },
      ],
    }).select("-password");

    if (!foundUser) return res.status(404).json({ message: "User not found or invalid token" });

    req.user = foundUser;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};
