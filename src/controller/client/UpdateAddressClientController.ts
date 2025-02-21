import { Request, Response } from "express";
import { UpdateAddressClientService } from "../../service/client/UpdateAddressClientService.js";

export class UpdateAddressClientController {
    private updateAddressClientService: UpdateAddressClientService;

    constructor() {
        this.updateAddressClientService = new UpdateAddressClientService();
    }

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { address, city, state, cep } = request.body;
            const updateData = { address, city, state, cep };

            const updatedClient = await this.updateAddressClientService.update(String(id), updateData);
            return response.status(200).json(updatedClient);
        } catch (error) {
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