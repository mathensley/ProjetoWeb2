import { PrismaClient, Cart } from "@prisma/client";

export class AddItemToCartService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    
    public async add(data: {
        clientId: string;
        productId: string;
        quantity?: number;
    }) {
        const { clientId, productId, quantity = 1 } = data;

        // Busca o carrinho do cliente
        const cart = await this.prismaClient.cart.findUnique({
            where: { clientId },
        });

        if (!cart) {
            throw new Error("Cart not found for this client");
        }

        // Verifica se o produto já está no carrinho
        const existingItem = await this.prismaClient.cartItem.findFirst({
            where: {
            cartId: cart.id,
            productId,
            },
        });

        if (existingItem) {
            // Atualiza a quantidade
            return await this.prismaClient.cartItem.update({
              where: {
                id: existingItem.id,
              },
              data: {
                quantity: existingItem.quantity + quantity,
              },
            });
          } else {
            // Cria novo item
            return await this.prismaClient.cartItem.create({
              data: {
                cartId: cart.id,
                productId,
                quantity,
              },
            });
        }
    }
}