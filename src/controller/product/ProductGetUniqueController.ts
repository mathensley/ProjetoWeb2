import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { ProductGetUniqueService } from "../../service/products/ProductGetUniqueService.js";

export class ProductGetUniqueController {
    private productGetUniqueService: ProductGetUniqueService;

    constructor() {
        this.productGetUniqueService = new ProductGetUniqueService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const responseProducts: Product[] | null = await this.productGetUniqueService.handle(String(id));
            return response.status(200).json(responseProducts);

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