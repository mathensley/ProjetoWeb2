import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdateStateEstablishmentService } from "../../service/establishment/UpdateStateEstablishmentService.js";

export class UpdateStateEstablishmentController {
    private updateStateEstablishmentService: UpdateStateEstablishmentService; 

    constructor() {
        this.updateStateEstablishmentService = new UpdateStateEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { state } = request.body;

        try {
            const establishmentResponse: Establishment = await this.updateStateEstablishmentService.update(String(id), state);
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