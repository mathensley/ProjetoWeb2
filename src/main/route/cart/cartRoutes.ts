import { CartController } from "../../controller/cart/CartController";
import { NextFunction, Router, Request, Response } from "express";
import { AuthService } from "../../service/auth/AuthService";

const cartRoutes = Router();

const authService = new AuthService();
const cartController = new CartController();

cartRoutes.post("/api/cart/add",
    (request: Request, response: Response) => {cartController.addItemToCart(request, response)}
);

cartRoutes.patch("/api/cart/item/:id",
    (request: Request, response: Response) => {cartController.updateItemQuantity(request, response)}
);

cartRoutes.delete("/api/cart/item/:id",
    (request: Request, response: Response) => {cartController.deleteItemFromCart(request, response);}
);

export default cartRoutes;