import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./Middleware/Error.js";
import user from './Routes/userRoutes.js'
import  course from './Routes/courseRoutes.js'
import  payment from './Routes/paymentRoutes.js'
import  other from './Routes/otherRoutes.js'
import cookieParser from "cookie-parser";




config({
  path: "./config/config.env",
});

const app = express();
// Using MiddleWares 
app.use(express.json())
app.use(
  express.urlencoded({
    extended:true,
  })
)


app.use(cookieParser())



// Importing & Using Routes

app.use('/api/v1',course)
app.use('/api/v1',user)
app.use('/api/v1',payment)
app.use('/api/v1',other)



export default app;


app.use(ErrorMiddleware)