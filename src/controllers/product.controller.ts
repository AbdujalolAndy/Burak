import { HttpCode, Message } from "../libs/Error";
import { AdminRequest, T } from "../libs/types/common";
import Errors from "../libs/Error";
import { Request, Response } from "express";
import ProductService from "../models/Product.service";
import { Product, ProductInput, ProductInquiry } from "../libs/types/product.type";
import { ProductCollection } from "../libs/enums/product.enum";


const productController: T = {};

//SPA
productController.getProducts = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: getAllProducts");
        const query = req.query;
        const inquiry: ProductInquiry = {
            page: Number(query.page),
            limit: Number(query.limit),
            order: String(query.order)
        }

        if (query.productCollection) { inquiry.productCollection = query.productCollection as ProductCollection };
        if (query.search) { inquiry.search = query.search as string };

        const productService = new ProductService();
        const result = await productService.getProducts(inquiry);

        res.status(HttpCode.OK).json({ result })
    } catch (err: any) {
        console.log(`Error: getAllProducts, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

//SSR
productController.getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: getAllProducts");
        const product = new ProductService();
        const products: Product[] = await product.getAllProducts();
        res.render("products", { products });
    } catch (err: any) {
        console.log(`Error: getAllProducts, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

productController.createProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log("METHOD: createProduct");
        const input: ProductInput = req.body;
        if (!req.files.length) new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
        input.productImages = req.files?.map((ele) => { return ele.path })

        const product = new ProductService();
        await product.createProduct(input)

        res.send(`<script>alert('Successfully created!'); window.location.replace("/admin/product/all")</script>`)
    } catch (err: any) {
        console.log(`Error: createProduct, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(`<script>alert('${message}'); window.location.replace("/admin/product/all")</script>`)

    }
}

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: updateChosenOne");
        const id = req.params.id;

        const product = new ProductService()
        const result: Product = await product.updateChosenProduct(id, req.body);
        res.status(HttpCode.OK).json({ data: result })
    } catch (err: any) {
        console.log(`Error: updateChosenOne, HttpCode: [${err.code ?? HttpCode.INTERNAL_SERVER_ERROR}], Message: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

export default productController;