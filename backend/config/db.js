import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connectd: ${conn.connection.host}`);
  } catch (error) {
    console.log("could not connect", error);
    process.exit(1);
  }
};
