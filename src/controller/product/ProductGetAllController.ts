import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { ProductGetAllService } from "../../service/products/ProductGetAllService.js";

export class ProductGetAllController {
    private productGetAllService: ProductGetAllService;

    constructor() {
        this.productGetAllService = new ProductGetAllService();
    }

    async handle(request: Request, response: Response) {
        const responseProducts: Product[] | null = await this.productGetAllService.handle();    
        return response.status(200).json(responseProducts);
    }
}