import { Router } from "express";
import { Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService.js";
import { ProductGetUniqueController } from "../../controller/product/ProductGetUniqueController.js";
import { ProductGetAllController } from "../../controller/product/ProductGetAllController.js";
import { ProductDeleteUniqueController } from "../../controller/product/ProductDeleteUniqueController.js";
import { ProductDeleteAllController } from "../../controller/product/ProductDeleteAllController.js";
import { ProductPostController } from "../../controller/product/ProductPostController.js";

const productsRouter = Router();

const authService = new AuthService();
const productPostController = new ProductPostController();
const productGetUniqueController = new ProductGetUniqueController();
const productGetAllController = new ProductGetAllController();
const productDeleteUniqueController = new ProductDeleteUniqueController();
const productDeleteAllController = new ProductDeleteAllController();

productsRouter.post("/v1/products", 
    authService.verifyToken, 
    (request: Request, response: Response) => {productPostController.handle(request, response)}
);

productsRouter.get("/v1/products/:id", 
    (request: Request, response: Response) => {productGetUniqueController.handle(request, response)}
);

productsRouter.get("/v1/products", 
    (request: Request, response: Response) => {productGetAllController.handle(request, response)}
);

productsRouter.delete("/v1/products", 
    authService.verifyToken,
    (request: Request, response: Response) => {productDeleteUniqueController.handle(request, response)}
);

productsRouter.delete("/v1/products/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {productDeleteAllController.handle(request, response)}
);

export default productsRouter;