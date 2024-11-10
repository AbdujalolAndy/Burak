import { T } from "../libs/types/common";
import {Request, Response} from "express"

const restaurantController:T = {}

restaurantController.goHome = async(req:Request, res:Response)=>{
    try{
        res.send("Home Page")
    }catch(err:any){
        console.log("Error: goHome", err)
    }
}
restaurantController.getLogIn = async(req:Request, res:Response)=>{
    try{
        res.send("Log In")
    }catch(err:any){
        console.log("Error: goHome", err)
    }
}
restaurantController.getSignUp = async(req:Request, res:Response)=>{
    try{
        res.send("Sign Up")
    }catch(err:any){
        console.log("Error: goHome", err)
    }
}

export default restaurantController