import { PrismaClient } from '@prisma/client';
import { errors_user_code } from "../../utils/ErrorsCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class DeleteDeliveryRiderService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async delete(id: string) {
        try {
            const deleted = await this.prismaClient.deliveryRider.delete({where: {id}});
            if (!deleted) {
                throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR);
            }
        } catch (error: any) {
            if (error.code == "P2025") {
                throw new Error("Delivery Rider not found");
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR)
        }
    }
}