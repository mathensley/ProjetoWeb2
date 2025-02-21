import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { UpdateDescriptionProductService } from "../../service/products/UpdateDescriptionProductService.js";

export class UpdateDescriptionProductController {
    private updateDescriptionProductService: UpdateDescriptionProductService;

    constructor() {
        this.updateDescriptionProductService = new UpdateDescriptionProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { description } = request.body;

        try {
            const productResponse: Product = await this.updateDescriptionProductService.update(String(id), description);
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