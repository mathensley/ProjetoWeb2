import { Router } from "express";
import { Request, Response } from "express";
import { ProductController } from "../../controller/product/ProductController.js";
import { AuthService } from "../../service/auth/AuthService.js";

const productsRouter = Router();

const productControler = new ProductController();
const authService = new AuthService();

productsRouter.get("/v1/products/:id", 
    (request: Request, response: Response) => {productControler.get(request, response)}
);

productsRouter.get("/v1/products", 
    (request: Request, response: Response) => {productControler.getAll(request, response)}
);

productsRouter.post("/v1/products", authService.verifyToken, 
    (request: Request, response: Response) => {productControler.register(request, response)}
);

productsRouter.delete("/v1/products", authService.verifyToken, 
    (request: Request, response: Response) => {productControler.deleteAll(request, response)}
);

productsRouter.post("/v1/products/:id", authService.verifyToken, 
    (request: Request, response: Response) => {productControler.delete(request, response)}
);

export default productsRouter;