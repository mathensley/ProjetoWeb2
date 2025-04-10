import { Establishment } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateEstablishmentService } from "../../service/establishment/UpdateEstablishmentService";

export class UpdateEstablishmentController {
    private updateEstablishmentService: UpdateEstablishmentService;

    constructor() {
        this.updateEstablishmentService = new UpdateEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const establishment: Establishment = request.body;

        try {
            const establishmentResponse: Establishment = await this.updateEstablishmentService.update(String(id), establishment);
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