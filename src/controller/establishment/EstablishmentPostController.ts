import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { EstablishmentPostService } from "../../service/establishment/EstablishmentPostService.js";

export class EstablishmentPostController {
    private establishmentPostService: EstablishmentPostService; 

    constructor() {
        this.establishmentPostService = new EstablishmentPostService();
    }

    async handle(request: Request, response: Response) {
        const data: Establishment = request.body;

        try {
            const productResponse: Establishment = await this.establishmentPostService.handle(data);
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