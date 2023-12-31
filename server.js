import app from "./app.js";
import { connectDb } from "./config/Database.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodecron from "node-cron";
import { Stats } from "./Modals/stats.js";
connectDb();


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECERT,
});


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

nodecron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});






app.listen(process.env.PORT, () => {
  console.log(`Server is running on port:${process.env.PORT}`);
});
