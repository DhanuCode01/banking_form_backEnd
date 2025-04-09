import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./Router/UserRouter.js";


dotenv.config();

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use((req,res,next)=>{
    
    let token=req.header  //midleware webtoken reading
    ("Authorization")
    
     if (token!=null){
        token=token.replace("Bearer ","") //"Bearer" Skip this word  
        jwt.verify(token,process.env.jwt_SECRET,
            (err,decoded)=>{                //get error or decoded value
                if(!err){
                    req.user=decoded;      //assign reqest user to decoded value  
                }
            }
        )
     }
     next() 
 
})  
  

let mongoURL=process.env.Mongo_URL;
mongoose.connect(mongoURL);
let connection=mongoose.connection;
connection.once("open",()=>{
    console.log("Connection is OK")
})


app.use("/api/user",userRouter);




app.listen(3002,()=>{
    console.log("Server port 3002 is running ")
    
});
