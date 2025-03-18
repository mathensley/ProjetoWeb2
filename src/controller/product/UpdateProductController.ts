import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateProductService } from "../../service/products/UpdateProductService";

export class UpdateProductController {
    private updateProductService: UpdateProductService;

    constructor() {
        this.updateProductService = new UpdateProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const product: Product = request.body;

        try {
            const responseProduct: Product = await this.updateProductService.update(String(id), product);
            return response.status(200).json(responseProduct);

        } catch(error: unknown) {
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