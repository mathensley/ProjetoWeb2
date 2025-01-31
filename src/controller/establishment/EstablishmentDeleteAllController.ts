import { Request, Response } from "express";
import { EstablishmentDeleteAllService } from "../../service/establishment/EstablishmentDeleteAllService.js";

export class EstablishmentDeleteAllController {
    private establishmentDeleteAllService: EstablishmentDeleteAllService; 

    constructor() {
        this.establishmentDeleteAllService = new EstablishmentDeleteAllService();
    }

    async handle(request: Request, response: Response) {
        try {
            this.establishmentDeleteAllService.handle().then(() => {
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