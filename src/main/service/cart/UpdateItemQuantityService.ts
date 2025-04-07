import { PrismaClient } from "@prisma/client";

interface UpdateQuantityParams {
    itemId: string;
    quantity: number;
}

export class UpdateItemQuantityService {
    private prisma = new PrismaClient();

    async update({ itemId, quantity }: UpdateQuantityParams) {
        try {
            if (quantity < 1) {
                throw new Error("Quantity must be equal or greater than 1");
            }
    
            // Atualiza a quantidade do item
            const updatedItem = await this.prisma.cartItem.update({
                where: { id: itemId },
                data: { quantity },
                include: {
                    product: true,
                    cart: {
                        include: {
                            items: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            });
    
            // Recalcula subtotal do item
            const totalItem = updatedItem.quantity * Number(updatedItem.product.price);
    
            // Recalcula o total do carrinho
            const totalCart = updatedItem.cart.items.reduce((acc, item) => {
                return acc + item.quantity * Number(item.product.price);
            }, 0);
    
            return {
                item: {
                    id: updatedItem.id,
                    quantity: updatedItem.quantity,
                    product: {
                        id: updatedItem.product.id,
                        name: updatedItem.product.name,
                        price: updatedItem.product.price,
                        image: updatedItem.product.image
                    },
                    totalItem
                },
                cart: {
                    id: updatedItem.cart.id,
                    totalCart
                }
            };
        } catch (error: any) {
            throw error;
        }
    }
}