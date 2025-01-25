import { Request, Response } from "express";

export class ControllerTest {
    async handle(request: Request, response: Response) {
        const result = [
            {
                name: "Bolo",
                description: "Bolo de chocolate",
                price: 200
            }
        ]
        return response.status(200).json(result);
    }
}