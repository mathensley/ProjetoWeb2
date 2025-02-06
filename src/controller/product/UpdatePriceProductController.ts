import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { UpdatePriceProductService } from "../../service/products/UpdatePriceProductService.js";

export class UpdatePriceProductController {
    private updatePriceProductService: UpdatePriceProductService; 

    constructor() {
        this.updatePriceProductService = new UpdatePriceProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { price } = request.body;

        try {
            const productResponse: Product = await this.updatePriceProductService.update(String(id), Number(price));
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