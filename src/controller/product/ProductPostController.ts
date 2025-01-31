import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { ProductPostService } from "../../service/products/ProductPostService.js";

export class ProductPostController {
    private productPostService: ProductPostService;  

    constructor() {
        this.productPostService = new ProductPostService();
    }

    async handle(request: Request, response: Response) {
        const data: Product = request.body;

        try {
            const productResponse: Product = await this.productPostService.handle(data);
            return response.status(200).json(productResponse);

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