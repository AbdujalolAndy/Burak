import { ProductStatus } from "../libs/enums/product.enum";
import { shapeIntoMongodbObject } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Error";
import { Product, ProductInput, ProductUpdateInput } from "../libs/types/product.type";
import ProductModel from "../schema/Product.model";

class ProductService {
    private readonly productModel;
    constructor() {
        this.productModel = ProductModel;
    }

    //SPA

    //SSR
    public async getAllProducts(): Promise<Product[]> {
        try {
            const result = await this.productModel.find({ productStatus: ProductStatus.PROCESS }).exec();
            if (!result.length) {
                throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
            }
            return result
        } catch (err: any) {
            throw err;
        }
    }

    public async createProduct(input: ProductInput): Promise<Product> {
        try {
            return await this.productModel.create(input);
        } catch (err: any) {
            console.log(`MONGO EROR: createProduct - ${err.message}`)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
        }
    }

    public async updateChosenProduct(id: string, input: ProductUpdateInput): Promise<Product> {
        try {
            const productId = shapeIntoMongodbObject(id);
            const modifiedProduct = await this.productModel.findByIdAndUpdate(productId, input, { new: true }).exec();
            return modifiedProduct;
        } catch (err: any) {
            throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)
        }
    }
}

export default ProductService