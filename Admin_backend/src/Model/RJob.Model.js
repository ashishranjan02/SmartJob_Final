import mongoose from "mongoose";

const addjobSchema = mongoose.Schema({
    jobId:{
        type:String,
        unique:true,
        required:true,
    },
    jobTitle:{
        type:String,
        required:true,
    },
    jobDescription:{
        type:String,
        required:true,
    },
    requiredSkillandQualification:{
        type:String,
        required:true,
    }, 
    skill:{
        type:[String],
        required:true,
    },
    minimumSalary:{
        type:Number,
        required:true,
    },
    maximumSalary:{
        type:Number,
        required:true,
    },
    jobType:{
        type:String,
        enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
        required:true,
    },
    experienceLevel:{
        type:String,
        enum: ["Fresher", "Junior", "Mid", "Senior", "Lead"],
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    postingDate:{
        type:Date,
        required:true,
    },
    applicationDeadline:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:['Active', 'Expired'],
        default:"Active",
    }
},{timestamps:true})

addjobSchema.pre('validate', function (next) {
  if (!this.jobId) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    this.jobId = `jd_${randomDigits}post`;
  }
  next();
});

const addjob = mongoose.model('addJobModel', addjobSchema);
export default addjob;