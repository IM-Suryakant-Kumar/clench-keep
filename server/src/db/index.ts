import mongoose from "mongoose";

const connectDB = async () => {
	return await mongoose.connect(process.env.MONGO_URL!);
};

export default connectDB;
