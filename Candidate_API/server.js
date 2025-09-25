import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
