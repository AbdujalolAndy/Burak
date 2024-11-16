import { HttpCode } from "../libs/Error";
import { T } from "../libs/types/common";
import Errors from "../libs/Error";
import { Request, Response } from "express";


const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: getAllProducts");
        res.render("products");
    } catch (err: any) {
        console.log(`Error: getAllProducts, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

productController.createProduct = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: createProduct");
        res.send('Done')
    } catch (err: any) {
        console.log(`Error: createProduct, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: updateChosenOne")
    } catch (err: any) {
        console.log(`Error: updateChosenOne, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export default productController;