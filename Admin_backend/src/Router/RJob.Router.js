import express  from 'express';
import {createJob, getAllJobs, getJobById, updateJob, deleteJob} from '../Controller/RJob.Controller.js'

const rjobrouter = express.Router();

rjobrouter.post("/", createJob);
rjobrouter.get("/",  getAllJobs);
rjobrouter.get("/:id",  getJobById);
rjobrouter.put("/:id",  updateJob);
rjobrouter.delete("/:id",  deleteJob);


export default rjobrouter;
