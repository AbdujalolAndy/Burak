import { T } from "../libs/types/common";
import { Request, Response } from "express"

const restaurantController: T = {}

restaurantController.goHome = async (req: Request, res: Response) => {
    try {
        console.log("goHome")
        res.send("Home Page")
    } catch (err: any) {
        console.log("Error: goHome", err)
    }
}
restaurantController.getLogin = async (req: Request, res: Response) => {
    try {
        console.log("")
        res.send("Log In")
    } catch (err: any) {
        console.log("Error: goHome", err)
    }
}
restaurantController.getSignup = async (req: Request, res: Response) => {
    try {
        res.send("Sign Up")
    } catch (err: any) {
        console.log("Error: goHome", err)
    }
}
restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        res.send("processLogin")
    } catch (err: any) {
        console.log("Error: goHome", err)
    }
}
restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        res.send("processLogin")
    } catch (err: any) {
        console.log("Error: goHome", err)
    }
}

export default restaurantController