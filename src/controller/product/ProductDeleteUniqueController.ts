import { Request, Response } from "express";
import { ProductDeleteUniqueService } from "../../service/products/DeleteProductUniqueService.js";

export class ProductDeleteUniqueController {
    private productDeleteUniqueService: ProductDeleteUniqueService; 

    constructor() {
        this.productDeleteUniqueService = new ProductDeleteUniqueService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            this.productDeleteUniqueService.handle(String(id)).then(() => {
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