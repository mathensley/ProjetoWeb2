import { Request, Response } from "express";
import { Product } from "@prisma/client";
import { CreateProductService } from "../../service/products/CreateProductService";
import { Decimal } from "@prisma/client/runtime/library";

import fs from "fs";
import path from "path";

const uploadFolder = path.resolve(__dirname, "../../utils/image/product_imgs");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

export class CreateProductController {
    private createProductService: CreateProductService;  

    constructor() {
        this.createProductService = new CreateProductService();
    }

    async handle(request: Request, response: Response) {
        //const data: Product = request.body;
        const {name, description, category, price, promotion, establishmentId } = request.body;
        //const image = request.file?.filename || null;
        let imageFileName: string | undefined;
        const file = request.file;

        try {
            if (file) {
                const ext = path.extname(file.originalname);
                const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
                imageFileName = uniqueName;
            }

            const data = {
                name,
                description,
                category,
                image: imageFileName,
                price: new Decimal(price),
                promotion: promotion === "true" || promotion === true,
                establishmentId: establishmentId?.trim() ? establishmentId : null
            };
            const productResponse: Product = await this.createProductService.create(data);

            if (file && imageFileName) {
                const filePath = path.join(uploadFolder, imageFileName);

                // Cria dir se não existir
                if (!fs.existsSync(uploadFolder)) {
                    fs.mkdirSync(uploadFolder, { recursive: true });
                }

                fs.writeFileSync(filePath, file.buffer);
            }

            return response.status(201).json(productResponse);
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