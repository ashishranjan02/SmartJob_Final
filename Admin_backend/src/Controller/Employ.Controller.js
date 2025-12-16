import employ from "../Model/Employ.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const createEmploy = async (req, res) => {
    console.log("Req body:", req.body);
    console.log("Req file:", req.file);

    try {
        const {
            firstName, lastName, gender, email, phoneNo,
            currentLocation, description, totalExperience,
            level, status, role, companyName, password, confirmPassword} = req.body;

        // 1. Required fields check
        if (!firstName || !lastName || !gender || !email || !phoneNo ||
            !currentLocation || !description || !totalExperience ||
            !level || !status ||!role ||!companyName ||!password ||!confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: "Password don't Match"})
        }

        const existingRecruiter = await employ.findOne({ email });
        if (existingRecruiter) {
            return res.status(409).json({ message: "Recruiter already exists" });
        }

        // 4. Profile photo (safe check)
        const recruiterImage = req.file ? req.file.path : null;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const saveRecruiter = new employ({
            firstName, lastName, gender, email, phoneNo,
            currentLocation, description, totalExperience,
            level, recruiterImage, status, companyName, role, password:hashedPassword
        });

        await saveRecruiter.save();

        res.status(201).json({ message: "Register Successfully" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {

  try {
      console.log("req", req.body)
      const { email, password } = req.body;

    const user = await employ.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
     const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, recruiterId: user.recruiterId, adminId: user.adminId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const Image = user.recruiterImage? `${req.protocol}://${req.get("host")}/${user.recruiterImage}` : null;

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      recruiterId: user.recruiterId,
      adminId: user.adminId,
      firstName: user.firstName,
      lastName: user.firstName,
      gender: user.gender,
      email: user.email,
      phoneNo: user.phoneNo,
      currentLocation: user.currentLocation, 
      description: user.description, 
      totalExperience: user.totalExperience,
      level: user.level, 
      status: user.status,
      recruiterImage: Image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllEmploy = async(req, res) => {
    try{
        const allEmploy = await employ.find()
        res.status(200).json(allEmploy)

        if(!allEmploy){
            res.status(400).json({message:'Employ not Found'})
        }
    }
    catch (error){
        console.error(error)
        res.status(500).json({message: error.message})
    }
}


export const getRecruiterById = async(req, res) =>{
  const {recruiterId} = req.params;
  
  if(!recruiterId){
    return res.status(400).json({message: "Recruiter ID is required"});
  }
  try{
    const viewRecruiter = await employ.findOne({recruiterId}).select("-password");
    res.status(200).json(viewRecruiter)

    if(!viewRecruiter){
      return res.status(400).json({message: 'Recruiter not find with recruiterId'})
    }
  }
  catch(error){
    console.error(error)
    res.status(500).json({message: error.message})
  }
}

export const getEmployProfile = async (req, res) => {
  const {recruiterId} = req.params;

  if(!recruiterId){
     return res.status(400).json({message: "ID is required"});
  }
  try {
    const employProfile = await employ.findOne({recruiterId}).select("-password");

    if (!employProfile) {
      return res.status(404).json({ message: "Employee profile not found" });
    }
    res.status(200).json(employProfile);
  } 
  catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


export const updateRecruiterProfile = async (req, res) => {
  const { recruiterId } = req.params;
  try {

    const allowedUpdates = [
      "firstName", "lastName", "gender", "phoneNo", "currentLocation",
      "description", "totalExperience", "level", "companyName"
    ];

    const updateData = Object.fromEntries(
      Object.entries(req.body || {}).filter(([key]) => allowedUpdates.includes(key))
    );

    if (req.file) { 
      updateData.recruiterImage = req.file.path;
    }

    const existingRecruiter = await employ.findOneAndUpdate({ recruiterId }, updateData,
      { new: true, runValidators: true }
    )

    if (!existingRecruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({ message: "Recruiter updated successfully", employ: existingRecruiter });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const updateRecruiterStatus = async (req, res) => {

  const { recruiterId } = req.params;
  const { status } = req.body; 

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  let updateFields = { status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() };

  switch (status.toLowerCase()) {
    case "active":
      updateFields = { ...updateFields, activeRecruiter: true, deactiveRecruiter: false, blockedRecruiter: false };
      break;
    case "deactive":
      updateFields = { ...updateFields, activeRecruiter: false, deactiveRecruiter: true, blockedRecruiter: false };
      break;
    case "blocked":
      updateFields = { ...updateFields, activeRecruiter: false, deactiveRecruiter: false, blockedRecruiter: true };
      break;
    default:
      return res.status(400).json({ message: "Invalid status type" });
  }

  try {
    const updateStatus = await employ.findOneAndUpdate(
      { recruiterId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updateStatus) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    return res.status(200).json({message: "Recruiter status updated successfully", data: updateStatus});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getAllRecruiterCount = async (req, res) => {
  try {
    const totalCount = await employ.countDocuments();
    res.status(200).json({message:"Total Recruiter", Count: totalCount});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

export const getActiveRecruiterCount = async(req, res) =>{
  try{
      const activeRecruiter = await employ.countDocuments({activeRecruiter: true})
      return res.status(200).json({message: "Active Recruiter", Count: activeRecruiter })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
}

export const getDectiveRecruiterCount = async(req, res) =>{
  try{
      const deactiveRecruiter = await employ.countDocuments({deactiveRecruiter: true})
      return res.status(200).json({message: "Deactive Recruiter", Count: deactiveRecruiter })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
}

export const getBlockedRecruiterCount = async(req, res) =>{
  try{
      const blockedRecruiter = await employ.countDocuments({blockedRecruiter: true})
      return res.status(200).json({message: "Blocked Recruiter", Count: blockedRecruiter })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
}