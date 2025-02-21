import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdateCEPEstablishmentService } from "../../service/establishment/UpdateCEPEstablishmentService.js";

export class UpdateCEPEstablishmentController {
    private updateCEPEstablishmentService: UpdateCEPEstablishmentService; 

    constructor() {
        this.updateCEPEstablishmentService = new UpdateCEPEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { cep } = request.body;

        try {
            const establishmentResponse: Establishment = await this.updateCEPEstablishmentService.update(String(id), cep);
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