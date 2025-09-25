import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    pendingEmail: {
      type: String, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
    linkedin: {
      type: String,
      required: [true, "LinkedIn URL is required"],
      match: [
        /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
        "Please enter a valid LinkedIn URL",
      ],
    },
    portfolio: {
      type: String,
      match: [/^https?:\/\/.+/i, "Please enter a valid portfolio URL"],
    },
    otherLinks: {
      type: [String],
      default: [],
      validate: {
        validator: function (links) {
          return links.every((url) => /^https?:\/\/.+/i.test(url));
        },
        message: "All otherLinks must be valid URLs",
      },
    },
    resume: {
      type: String, // Cloudinary file URL
      required: [true, "Resume is required"],
    },
    photo: {
      type: String, // Cloudinary image URL
      required: [true, "Photo is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
