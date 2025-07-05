import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app=express();

//middleware
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json())//this middleware make pass to json body it access the req.body 
app.use(rateLimiter);

//custom middleware
//app.use((req,res,next)=>{
  //console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  //next();
//})

app.use("/api/notes",notesRoutes);

connectDB().then(()=>{

app.listen(5001,()=>{
  console.log("Server is running at Port 5001");
});
});
