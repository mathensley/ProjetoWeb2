import { PrismaClient } from "@prisma/client";

export class DeleteItemFromCartService {
    private prisma: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prisma = prismaClient || new PrismaClient();
    }

    async delete(itemId: string) {
        const item = await this.prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { cart: true }
        });

        if (!item) {
            throw new Error("Item not found");
        }

        // Deleta o item
        await this.prisma.cartItem.delete({
            where: { id: itemId }
        });

        // Retorna o carrinho atualizado
        const updatedCart = await this.prisma.cart.findUnique({
            where: { id: item.cartId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!updatedCart) {
            throw new Error("Cart not found");
        }

        const itemsWithTotals = updatedCart.items.map(item => {
            const totalItem = item.quantity * Number(item.product.price);
            return {
                id: item.id,
                quantity: item.quantity,
                product: {
                    id: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    image: item.product.image
                },
                totalItem
            };
        });

        const totalCart = itemsWithTotals.reduce((sum, item) => sum + item.totalItem, 0);

        return {
            id: updatedCart.id,
            items: itemsWithTotals,
            totalCart
        };
    }
}