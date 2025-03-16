import { PrismaClient } from '@prisma/client';
import { errors_user_code } from "../../utils/ErrorsCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class DeleteClientService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async delete(id: string) {
        try {
            const deletedClient = await this.prismaClient.client.delete({where: {id}});
            if (!deletedClient) {
                throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR);
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2025") {
                throw new Error("Client not found.");
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR)
        }
    }
}