import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const connectDb = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/next-app");
};

export { connectDb };
