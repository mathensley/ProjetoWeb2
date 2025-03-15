import { Request, Response } from "express";
import { DeleteProductService } from "../../service/products/DeleteProductService.js";

export class DeleteProducByIdController {
    private deleteProductService: DeleteProductService; 

    constructor() {
        this.deleteProductService = new DeleteProductService();
    }

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            await this.deleteProductService.delete(String(id));

            return response.status(200).json({
                message: "Ok"
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