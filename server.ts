import app from "./src/app";
import dotenv from "dotenv";
import connectDB from "./src/config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});