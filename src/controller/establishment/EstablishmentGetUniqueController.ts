import { Request, Response } from "express";
import { Establishment, Product } from "@prisma/client";
import { EstablishmentGetUniqueService } from "../../service/establishment/EstablishmentGetUniqueService.js";

export class EstablishmentGetUniqueController {
    private establishmentGetUniqueService: EstablishmentGetUniqueService;

    constructor() {
        this.establishmentGetUniqueService = new EstablishmentGetUniqueService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const responseProducts: Establishment[] | null = await this.establishmentGetUniqueService.handle(String(id));
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