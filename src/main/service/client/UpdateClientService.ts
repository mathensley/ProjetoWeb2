import { PrismaClient, Client } from '@prisma/client';
import { BcryptUtil } from "../../utils/BCryptUtils";

export class UpdateClientService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async update(id: string, data: Partial<Client>): Promise<Client> {
        try {
            const existingClient = await this.prismaClient.client.findUnique({ where: { id } });

            if (!existingClient) {
                throw new Error("Client not found");
            }

            // Se a nova senha for fornecida, verificar se é igual à atual
            if (data.password) {
                const isSamePassword = await BcryptUtil.comparePassword(data.password, existingClient.password);
                if (isSamePassword) {
                    throw new Error("New password must be different from the current password");
                }
                data.password = await BcryptUtil.hashPassword(data.password);
            }
            
            if (data.cpf && data.cpf.length == 11) {
                throw new Error("Invalid CPF");
            }

            const updatedClient = await this.prismaClient.client.update({ where: { id }, data });
            return updatedClient;
        } catch (error: any) {
            throw error;
        }
    }
}