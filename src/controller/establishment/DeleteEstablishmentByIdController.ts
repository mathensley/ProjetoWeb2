import { Request, Response } from "express";
import { DeleteEstablishmentService } from "../../service/establishment/DeleteEstablishmentService.js";

export class DeleteEstablishmentByIdController {
    private deleteEstablishmentService: DeleteEstablishmentService; 

    constructor() {
        this.deleteEstablishmentService = new DeleteEstablishmentService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            this.deleteEstablishmentService.delete(String(id)).then(() => {
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