"use server"
import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB_URL not found");
  }

  if (isConnected) {
    return console.log("MONGODB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "myshopdb",
    });
    mongoose.set('strictQuery', true); 
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB not connected");
  }
};