import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { GetProductByIdService } from "../../service/products/GetProductByIdService.js";

export class GetProductByIdController {
    private getProductByIdService: GetProductByIdService;

    constructor() {
        this.getProductByIdService = new GetProductByIdService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const responseProducts: Product[] | null = await this.getProductByIdService.get(String(id));
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