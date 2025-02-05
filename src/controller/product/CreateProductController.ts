import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { CreateProductService } from "../../service/products/CreateProductService.js";

export class CreateProductController {
    private createProductService: CreateProductService;  

    constructor() {
        this.createProductService = new CreateProductService();
    }

    async handle(request: Request, response: Response) {
        const data: Product = request.body;

        try {
            const productResponse: Product = await this.createProductService.create(data);
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