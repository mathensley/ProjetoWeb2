import { Router } from "express";
import { Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService.js";
import { GetProductByIdController } from "../../controller/product/GetProductByIdController.js";
import { GetProductController } from "../../controller/product/GetProductController.js";
import { DeleteProducByIdController } from "../../controller/product/DeleteProductByIdController.js";
import { CreateProductController } from "../../controller/product/CreateProductController.js";
import { UpdateProductController } from "../../controller/product/UpdateProductController.js";
import { UpdateDescriptionProductController } from "../../controller/product/UpdateDescriptionProductController.js";
import { UpdateNameProductController } from "../../controller/product/UpdateNameProductController.js";
import { UpdatePriceProductController } from "../../controller/product/UpdatePriceProductController.js";
import { UpdatePromotionProductController } from "../../controller/product/UpdatePromotionProductController.js";
import { UpdateImageProductController } from "../../controller/product/UpdateImageProductController.js";

const productsRouter = Router();

const authService = new AuthService();

const createProductController = new CreateProductController();
const getProductByIdController = new GetProductByIdController();
const getProductController = new GetProductController();
const deleteProducByIdController = new DeleteProducByIdController();
const updateProductService = new UpdateProductController();
const updateDescriptionProductController = new UpdateDescriptionProductController();
const updateNameProductController = new UpdateNameProductController();
const updatePriceProductController = new UpdatePriceProductController();
const updatePromotionProductController = new UpdatePromotionProductController();
const updateImageProductController = new UpdateImageProductController();

productsRouter.post("/api/products", 
    authService.verifyToken, 
    (request: Request, response: Response) => {createProductController.handle(request, response)}
);

productsRouter.get("/api/products/:id", 
    (request: Request, response: Response) => {getProductByIdController.handle(request, response)}
);

productsRouter.get("/api/products", 
    (request: Request, response: Response) => {getProductController.handle(request, response)}
);

productsRouter.put("/api/products/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {updateProductService.handle(request, response)}
);

productsRouter.delete("/api/products/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {deleteProducByIdController.handle(request, response)}
);

productsRouter.patch("/api/products/name/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {updateNameProductController.handle(request, response)}
);

productsRouter.patch("/api/products/price/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {updatePriceProductController.handle(request, response)}
);

productsRouter.patch("/api/products/description/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {updateDescriptionProductController.handle(request, response)}
);

productsRouter.patch("/api/products/image/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {updateImageProductController.handle(request, response)}
);

productsRouter.patch("/api/products/promotion/:id", 
    authService.verifyToken, 
    (request: Request, response: Response) => {updatePromotionProductController.handle(request, response)}
);


export default productsRouter;