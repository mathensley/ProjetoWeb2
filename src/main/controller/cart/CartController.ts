import { Request, Response } from "express";
import { AddItemToCartService } from "../../service/cart/AddItemToCartService";
import { UpdateItemQuantityService } from "../../service/cart/UpdateItemQuantityService";
import { DeleteItemFromCartService } from "../../service/cart/DeleteItemFromCartService";

export class CartController {
    private addItemToCartService: AddItemToCartService;
    private updateItemQuantityService: UpdateItemQuantityService;
    private deleteItemFromCartService: DeleteItemFromCartService;

    constructor() {
        this.addItemToCartService = new AddItemToCartService();
        this.updateItemQuantityService = new UpdateItemQuantityService();
        this.deleteItemFromCartService = new DeleteItemFromCartService();
    }

    async addItemToCart(request: Request, response: Response) {
        try {
            const { clientId, productId, quantity } = request.body;

            const responseCart = await this.addItemToCartService.add({
                clientId,
                productId,
                quantity,
            });
            return response.status(200).json(responseCart);
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

    async updateItemQuantity(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { quantity } = request.body;

            const result = await this.updateItemQuantityService.update({ itemId: id, quantity })

            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An expected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }

    async deleteItemFromCart(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const result = await this.deleteItemFromCartService.delete(id);
            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                return response.status(500).json({
                    error: "An expected error occurred.",
                    info: error.message,
                    stackTrace: error.stack
                });
            }
        }
    }
}