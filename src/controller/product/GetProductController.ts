import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { GetProductService } from "../../service/products/GetProductService.js";

export class GetProductController {
    private getProductService: GetProductService;

    constructor() {
        this.getProductService = new GetProductService();
    }

    async handle(request: Request, response: Response) {
        const { page, size } = request.query;

        try {
            const responseProducts: Product[] | null = await this.getProductService.get(page, size);    
            return response.status(200).json(responseProducts);
        } 

        catch(error) {
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