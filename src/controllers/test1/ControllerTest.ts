import { Request, Response } from "express";

export class ControllerTest {
    async handle(request: Request, response: Response) {
        const { id } = request.query;
        
        let result: string = `Olá usuário de id ${id}!`;
        return response.status(200).json(result);
    }
}