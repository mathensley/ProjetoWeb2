import { Request, Response } from "express";
import { Establishment, Product } from "@prisma/client";
import { GetEstablishmentByIdService } from "../../service/establishment/GetEstablishmentByIdService.js";

export class GetEstablishmentByIdController {
    private getEstablishmentByIdService: GetEstablishmentByIdService;

    constructor() {
        this.getEstablishmentByIdService = new GetEstablishmentByIdService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params

        try {
            const responseProducts: Establishment[] | null = await this.getEstablishmentByIdService.get(String(id));
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