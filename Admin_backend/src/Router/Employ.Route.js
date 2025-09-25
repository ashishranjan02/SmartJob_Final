import express from 'express';
import {
  getAllEmploy,
  login,
  updateRecruiter,
  getRecruiterById,
  getAllRecruiterCount,
  getActiveRecruiterCount,
  updateRecruiterStatus,
  getDectiveRecruiterCount,
  getBlockedRecruiterCount,
  createEmploy,
} from '../Controller/Employ.Controller.js';
import { upload } from '../Middleware/multer.middleware.js';
import { verifyToken } from '../Middleware/auth.Middleware.js';

const employrouter = express.Router();

// Public routes
employrouter.post('/create', upload.single("recruiterImage"), createEmploy);
employrouter.post('/login', login);

// Protected routes
employrouter.get('/allemploy', verifyToken, getAllEmploy);
employrouter.put('/update/:recruiterId', verifyToken, upload.single("recruiterImage"), updateRecruiter);
employrouter.get('/view/:recruiterId', verifyToken, getRecruiterById);
employrouter.put('/updatestatus/:recruiterId', verifyToken, upload.none(), updateRecruiterStatus);
employrouter.get('/allcount', verifyToken, getAllRecruiterCount);
employrouter.get('/activecount', verifyToken, getActiveRecruiterCount);
employrouter.get('/deactivecount', verifyToken, getDectiveRecruiterCount);
employrouter.get('/blockedcount', verifyToken, getBlockedRecruiterCount);

export default employrouter;
