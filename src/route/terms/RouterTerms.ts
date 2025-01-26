import { Router } from "express";
import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const termsRouter = Router();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

termsRouter.get("/v1/terms", (request: Request, response: Response) => {
    const filePath = path.resolve(__dirname, "./terms.html");
    response.sendFile(filePath);
});

export default termsRouter;