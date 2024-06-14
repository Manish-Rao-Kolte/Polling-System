import mongoose from "mongoose";

const dbName = "polling-system";
const connetDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}?dbName=${dbName}`
        );
        console.log(`Host : ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.log("MongoDB connection failure.", error);
        process.exit(1);
    }
};

export default connetDB;
