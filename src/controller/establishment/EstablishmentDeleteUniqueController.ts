import { Request, Response } from "express";
import { EstablishmentDeleteUniqueService } from "../../service/establishment/EstablishmentDeleteUniqueService.js";

export class EstablishmentDeleteUniqueController {
    private establishmentDeleteUniqueService: EstablishmentDeleteUniqueService; 

    constructor() {
        this.establishmentDeleteUniqueService = new EstablishmentDeleteUniqueService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            this.establishmentDeleteUniqueService.handle(String(id)).then(() => {
                return response.status(200).json({
                    message: "Ok"
                });
            });
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