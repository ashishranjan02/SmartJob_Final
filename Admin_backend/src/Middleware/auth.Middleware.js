import jwt from 'jsonwebtoken';
import employ from '../Model/Employ.Model.js'


export const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await employ.findOne({
      $or: [{ adminId: decoded?.adminId }, { recruiterId: decoded?.recruiterId }]
    }).select("-password");

    if (!foundUser) {
      return res.status(404).json({ message: "User not found or invalid token" });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
