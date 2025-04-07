import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { GetProductByCategoryService } from "../../service/products/GetProductByCategoryService";

export class GetProductByCategoryController {
    private getProductByCategoryService: GetProductByCategoryService;

    constructor() {
        this.getProductByCategoryService = new GetProductByCategoryService();
    }

    async handle(request: Request, response: Response) {
        const { category } = request.params

        try {
            const responseProducts: Product[] = await this.getProductByCategoryService.get(String(category));

            const baseUrl = `${request.protocol}://${request.get("host")}`;
    
            const productsWithImageUrl = responseProducts?.map(product => ({
                ...product,
                imageUrl: product.image ? `${baseUrl}/images/products/${product.image}` : null
            }));

            return response.status(200).json(productsWithImageUrl);
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