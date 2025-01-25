import { Router } from "express";
import { ControllerTest } from "../controllers/test1/ControllerTest.js";
import { Request, Response } from "express";

const testeRouter = Router();

const controllerTest = new ControllerTest();

testeRouter.get("/v1/products", (request: Request, response: Response) => {
    controllerTest.handle(request, response);
});

export default testeRouter;
