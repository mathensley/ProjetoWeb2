import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdateNameEstablishmentService } from "../../service/establishment/UpdateNameEstablishmentService.js";

export class UpdateNameEstablishmentController {
    private updateNameEstablishmentService: UpdateNameEstablishmentService; 

    constructor() {
        this.updateNameEstablishmentService = new UpdateNameEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const { name } = request.body;

        try {
            const establishmentResponse: Establishment = await this.updateNameEstablishmentService.update(String(id), name);
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