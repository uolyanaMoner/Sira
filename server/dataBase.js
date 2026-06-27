import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.log("MongoDB error ❌", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("📦 DB Name:", mongoose.connection.name);
});

export default connectDB;