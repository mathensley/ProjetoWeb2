import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { UpdatePromotionProductService } from "../../service/products/UpdatePromotionProductService.js";

export class UpdatePromotionProductController {
    private updatePromotionProductService: UpdatePromotionProductService; 

    constructor() {
        this.updatePromotionProductService = new UpdatePromotionProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { promotion } = request.body;

        try {
            const productResponse: Product = await this.updatePromotionProductService.update(String(id), Boolean(promotion));
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