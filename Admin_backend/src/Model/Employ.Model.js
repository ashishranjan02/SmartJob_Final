import mongoose from 'mongoose';

const employSchema = mongoose.Schema({
    
    firstName:{type:String, required:true},
    lastName:{type:String, },
    gender:{type:String, required:true},
    email:{
        type:String, 
        required:true, 
        unique:true
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true,
        match:[/^[6-9][0-9]{9}$/, "Invalid phone number"]
    },
    currentLocation:{type:String, required:true},
    description:{type:String, requirdd:true},
    totalExperience:{type:String, required:true},
    level:{
        type:String,
        enum:['Junior Level', 'Mid Level', 'Senior Level', 'Management Level'],
        required:true,
    },
    recruiterImage:{type:String},
    recruiterId:{type:String, unique:true},
    status:{
        type:String,
        enum:['Active', 'Deactive', 'Blocked'],
        default:'Active'
    },
    companyName:{
        type:String,
        required:true,
    },
    activeRecruiter:{type: Boolean, default: true},
    deactiveRecruiter:{type: Boolean, default: false},
    blockedRecruiter: {type: Boolean, default: false},
    role:{
        type:String,
        enum:["Recruiter", "Admin"],
        required: true,
    },
    password:{
        type:String, 
        required:true, 
    },
    adminId:{type:String, unique:true},

})

employSchema.pre("save", async function (next) {
    if (this.role === "Recruiter" && !this.recruiterId)  {
        const prefix = "REC"; 
        const randomDigit = Math.floor(1000 + Math.random() * 9000);    
        this.recruiterId = `${prefix}${randomDigit}`;  
    }
    next();
});

employSchema.pre("save", async function (next) {
    if (this.role === "Admin" && !this.adminId) {
        const prefix = "ADM"; 
        const randomDigit = Math.floor(1000 + Math.random() * 9000);    
        this.adminId = `${prefix}${randomDigit}`;  
    }
    next();
});


const employ = mongoose.model('employ', employSchema);
export default employ;
