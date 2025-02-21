import { Request, Response } from "express";
import { Establishment } from "@prisma/client";
import { UpdateAddressEstablishmentService } from "../../service/establishment/UpdateAddressEstablishmentService.js";

export class UpdateAddressEstablishmentController {
    private updateAddressEstablishmentService: UpdateAddressEstablishmentService; 

    constructor() {
        this.updateAddressEstablishmentService = new UpdateAddressEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { address } = request.body;

        try {
            const establishmentesponse: Establishment = await this.updateAddressEstablishmentService.update(String(id), address);
            return response.status(200).json(establishmentesponse);

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