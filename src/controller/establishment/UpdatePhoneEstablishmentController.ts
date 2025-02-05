import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdatePhoneEstablishmentService } from "../../service/establishment/UpdatePhoneEstablishmentService.js";

export class UpdatePhoneEstablishmentController {
    private updatePhoneEstablishmentService: UpdatePhoneEstablishmentService; 

    constructor() {
        this.updatePhoneEstablishmentService = new UpdatePhoneEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.query;
        const { phone } = request.body;

        try {
            const establishmentResponse: Establishment = await this.updatePhoneEstablishmentService.update(String(id), phone);
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