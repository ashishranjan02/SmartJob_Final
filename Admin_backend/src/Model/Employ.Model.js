import mongoose from 'mongoose';

const employSchema = mongoose.Schema({
    
    firstName:{type:String, required:true},
    lastName:{type:String },
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
    description:{type:String, required:true},
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
  try {
    if (this.role === "Recruiter" && !this.recruiterId)  {
        let unique = false;
        while(!unique){
            const id = `REC${Math.floor(1000 + Math.random() * 9000)}`;
            const exist = await mongoose.model('employ').findOne({recruiterId: id})
            if(!exist){
                this.recruiterId = id;
                unique = true;
            }
        }
    }

    if (this.role === "Admin" && !this.adminId) {
        let unique = false;
        while(!unique){
            const id = `ADM${Math.floor(1000 + Math.random() * 9000)}`;
            const exist = await mongoose.model('employ').findOne({adminId: id})
            if(!exist){
                this.adminId = id;
                unique = true;
            }
        }
    }
    next();
  } 
  catch (error) {
    console.error(error);
  }
});

const employ = mongoose.model('employ', employSchema);
export default employ;
