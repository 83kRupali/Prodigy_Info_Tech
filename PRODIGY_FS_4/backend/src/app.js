import express from "express";
import { createServer } from "node:http";
import {  connectToSocket} from "./controller/socketManager.js";
import { Server } from "socket.io";
import router from "./routes/user.routes.js"
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const server=createServer(app);
const io=connectToSocket(server);
app.set("port",(process.env.PORT||8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",router);
app.get("/home",(req,res)=>{
    return res.json({"hello":"world"});
});

const start=async()=>{
   // const connectionDB=await mongoose.connect("mongodb+srv://Mehak:apnacall@cluster0.gn7rp.mongodb.net/");
    
    //const connectionDB = await mongoose.connect("mongodb+srv://rupaliramteke495:d17ghN8hlGGJN8du@coluster.ryx7vrb.mongodb.net/ZoomClone?retryWrites=true&w=majority&appName=Coluster");
    //const connectionDB = await mongoose.connect("mongodb+srv://rupaliramteke495:d17ghN8hlGGJN8du@coluster.ryx7vrb.mongodb.net/ZoomClone/");
    const connectionDB = await mongoose.connect("mongodb+srv://rupaliramteke495:d17ghN8hlGGJN8du@coluster.ryx7vrb.mongodb.net/ZoomClone?retryWrites=true&w=majority&appName=Coluster");

    console.log(`Connection user is: ${connectionDB.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("Listening at port 8000");
    })
};
start();