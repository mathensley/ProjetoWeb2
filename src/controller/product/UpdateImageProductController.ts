import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { UpdateImageProductService } from "../../service/products/UpdateImageProductService.js";

export class UpdateImageProductController {
    private updateImageProductService: UpdateImageProductService; 

    constructor() {
        this.updateImageProductService = new UpdateImageProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const { image } = request.body;

        try {
            const productResponse: Product = await this.updateImageProductService.update(String(id), image);
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