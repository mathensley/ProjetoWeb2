import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { RegisterProductService } from "../../service/products/RegisterProductService.js";
import { GetProductService } from "../../service/products/GetProductService.js";

export class ProductController {
    private getProductService: GetProductService;
    private registerProductService: RegisterProductService;    

    constructor() {
        this.getProductService = new GetProductService();
        this.registerProductService = new RegisterProductService();
    }

    async register(request: Request, response: Response) {
        const { name, description, price } = request.body;

        try {
            const productResponse: Product = await this.registerProductService.register(name, description, price);
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

    async getAll(request: Request, response: Response) {
        const responseProducts: Product[] | null = await this.getProductService.getAll();    
        return response.status(200).json(responseProducts);
    }

    async get(request: Request, response: Response) {
        const { id } = request.params

        try {
            const responseProducts: Product[] | null = await this.getProductService.get(String(id));
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