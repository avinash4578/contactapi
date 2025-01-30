import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import contactRouter from "./routes/Contact.js";
 import { config } from "dotenv";
 import cors from 'cors'

const app = express();
app.use(bodyParser.json());


// .env steup
config({ path: ".env" });

// // cors
app.use(cors({
  origin:true,
  methods:["POST","GET","DELETE","PUT"],
  credentials:true
}))

// Connect to the MongoDB database using Mongoose
mongoose

  .connect(process.env.MongoUrl, {
      dbName: "Cotanct_API_youtube", // Specify the database name to use
    }
  )
  .then(() => console.log("MongoDB Connected")) // If the connection is successful, log a success message
  .catch((err) => console.error("Connection error", err)); // If the connection fails, log the error

// user Router
app.use("/api/user", userRouter);

// contact Router
app.use("/api/contact", contactRouter);

const port = 4000;
app.listen(port, () => console.log(`Server is Running on Port ${port}`));