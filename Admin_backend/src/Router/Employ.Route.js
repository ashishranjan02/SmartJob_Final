import express from 'express';
import {
  getAllEmploy,
  login,
  updateRecruiterProfile,
  getRecruiterById,
  getEmployProfile,
  getAllRecruiterCount,
  getActiveRecruiterCount,
  updateRecruiterStatus,
  getDectiveRecruiterCount,
  getBlockedRecruiterCount,
  createEmploy,
} from '../Controller/Employ.Controller.js';
import { upload } from '../Middleware/multer.middleware.js';
import { verifyToken } from '../Middleware/Employ.Middleware.js';

const employrouter = express.Router();

// Public routes
employrouter.post('/create', upload.single("recruiterImage"), createEmploy);
employrouter.post('/login', login);


employrouter.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route" });
});

// Protected routes
employrouter.get('/allemploy', getAllEmploy);
employrouter.put('/update/:recruiterId', upload.single("recruiterImage"), updateRecruiterProfile);
employrouter.get('/view/:recruiterId', getRecruiterById);
employrouter.get('/fetchprofile/:recruiterId', getEmployProfile);
employrouter.put('/updatestatus/:recruiterId', verifyToken, upload.none(), updateRecruiterStatus);
employrouter.get('/allcount', verifyToken, getAllRecruiterCount);
employrouter.get('/activecount', verifyToken, getActiveRecruiterCount);
employrouter.get('/deactivecount', verifyToken, getDectiveRecruiterCount);
employrouter.get('/blockedcount', verifyToken, getBlockedRecruiterCount);

export default employrouter;
