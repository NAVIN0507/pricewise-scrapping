import mongoose from "mongoose";
let isConnected = false; // to track connection
export const connectToDB = async()=>{
    mongoose.set('strictQuery' , true);
    if(!process.env.MONGODB_URI) return console.log("No connection string");
    if(isConnected) return console.log("=> using existing connection");
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}