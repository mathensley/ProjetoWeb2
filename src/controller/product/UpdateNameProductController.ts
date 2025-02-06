import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { UpdateNameProductService } from "../../service/products/UpdateNameProductService.js";

export class UpdateNameProductController {
    private updateNameProductService: UpdateNameProductService; 

    constructor() {
        this.updateNameProductService = new UpdateNameProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { name } = request.body;

        try {
            const productResponse: Product = await this.updateNameProductService.update(String(id), name);
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