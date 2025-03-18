import { NextFunction, Router, Request, Response } from "express";
import { GetProductByIdController } from "../../controller/product/GetProductByIdController";
import { GetProductController } from "../../controller/product/GetProductController";
import { DeleteProducByIdController } from "../../controller/product/DeleteProductByIdController";
import { CreateProductController } from "../../controller/product/CreateProductController";
import { UpdateProductController } from "../../controller/product/UpdateProductController";
import { AuthService } from "../../service/auth/AuthService";

const productsRouter = Router();

const authService = new AuthService();
const createProductController = new CreateProductController();
const getProductByIdController = new GetProductByIdController();
const getProductController = new GetProductController();
const deleteProducByIdController = new DeleteProducByIdController();
const updateProductService = new UpdateProductController();

productsRouter.post("/api/products", 
    authService.verifyToken, 
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {createProductController.handle(request, response)}
);

productsRouter.get("/api/products/:id", 
    (request: Request, response: Response) => {getProductByIdController.handle(request, response)}
);

productsRouter.get("/api/products", 
    (request: Request, response: Response) => {getProductController.handle(request, response)}
);

productsRouter.patch("/api/products/:id", 
    authService.verifyToken, 
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {updateProductService.handle(request, response)}
);

productsRouter.delete("/api/products/:id", 
    authService.verifyToken, 
    (request: Request, response: Response, next: NextFunction) => authService.authorizeRoleAdmin(request, response, next),
    (request: Request, response: Response) => {deleteProducByIdController.handle(request, response)}
);

export default productsRouter;