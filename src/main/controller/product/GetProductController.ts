import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { GetProductService } from "../../service/products/GetProductService";

export class GetProductController {
    private getProductService: GetProductService;

    constructor() {
        this.getProductService = new GetProductService();
    }

    async handle(request: Request, response: Response) {
        const { page, size } = request.query;
    
        try {
            const responseProducts: Product[] | null = await this.getProductService.get(page, size);
    
            const baseUrl = `${request.protocol}://${request.get("host")}`;
    
            const productsWithImageUrl = responseProducts?.map(product => ({
                ...product,
                imageUrl: product.image ? `${baseUrl}/images/products/${product.image}` : null
            }));
    
            return response.status(200).json(productsWithImageUrl);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An expected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}