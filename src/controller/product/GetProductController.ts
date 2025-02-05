import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { GetProductService } from "../../service/products/GetProductService.js";

export class GetProductController {
    private getProductService: GetProductService;

    constructor() {
        this.getProductService = new GetProductService();
    }

    async handle(request: Request, response: Response) {
        const responseProducts: Product[] | null = await this.getProductService.get();    
        return response.status(200).json(responseProducts);
    }
}