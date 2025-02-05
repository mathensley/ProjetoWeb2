import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdateEmailEstablishmentService } from "../../service/establishment/UpdateEmailEstablishmentService.js";

export class UpdateEmailEstablishmentController {
    private updateEmailEstablishmentService: UpdateEmailEstablishmentService; 

    constructor() {
        this.updateEmailEstablishmentService = new UpdateEmailEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const { email } = request.body;

        try {
            const establishmentResponse: Establishment = await this.updateEmailEstablishmentService.update(String(id), email);
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