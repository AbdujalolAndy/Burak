import { T } from "../libs/types/common";
import {Request, Response} from "express"
import Member from "../models/Member.model";

const memberController:T = {}

memberController.goHome = async(req:Request, res:Response)=>{
    try{
        res.send("Home Page")
    }catch(err:any){
        console.log("Error: goHome", err)
    }
}
memberController.getLogIn = async(req:Request, res:Response)=>{
    try{
        res.send("Log In")
    }catch(err:any){
        console.log("Error: goHome", err)
    }
}
memberController.getSignUp = async(req:Request, res:Response)=>{
    try{
        console.log("")
        res.send("Sign Up")
    }catch(err:any){
        console.log("Error: goHome", err)
    }
}

export default memberController