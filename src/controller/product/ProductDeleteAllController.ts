import { Request, Response } from "express";
import { ProductDeleteAllService } from "../../service/products/DeleteProductAllService.js";

export class ProductDeleteAllController {
    private productDeleteAllService: ProductDeleteAllService; 

    constructor() {
        this.productDeleteAllService = new ProductDeleteAllService();
    }

    async handle(request: Request, response: Response) {
        try {
            this.productDeleteAllService.handle().then(() => {
                return response.status(200).json({
                    message: "Ok"
                });
            });
        } catch(error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An expected error ocurred.", 
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}