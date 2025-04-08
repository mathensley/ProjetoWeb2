import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GetClientService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async getAll() {
        try {
            const clients = await this.prismaClient.client.findMany({
                include: {
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

            // Mapeia os dados e calcula os totais
            return clients.map(client => {
                let cartData = null;

                if (client.cart) {
                    const itemsWithTotals = client.cart.items.map(item => {
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

                    cartData = {
                        id: client.cart.id,
                        items: itemsWithTotals,
                        totalCart
                    };
                }

                return {
                    id: client.id,
                    name: client.name,
                    username: client.username,
                    cpf: client.cpf,
                    email: client.email,
                    phone: client.phone,
                    address: client.address,
                    city: client.city,
                    state: client.state,
                    cep: client.cep,
                    created_at: client.created_at,
                    updatedAt: client.updatedAt,
                    establishmentId: client.establishmentId,
                    cart: cartData
                };
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new Error(error.code);
            }
            throw error;
        }
    }
}