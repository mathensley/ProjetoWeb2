import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdateCityEstablishmentService } from "../../service/establishment/UpdateCityEstablishmentService.js";

export class UpdateCityEstablishmentController {
    private updateCityEstablishmentService: UpdateCityEstablishmentService; 

    constructor() {
        this.updateCityEstablishmentService = new UpdateCityEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const { city } = request.body;

        try {
            const establishmentResponse: Establishment = await this.updateCityEstablishmentService.update(String(id), city);
            return response.status(200).json(establishmentResponse);

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