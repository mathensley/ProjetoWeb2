import { prismaClient } from "../../database/PrismaClient";
import { errors_user_code } from "../../utils/ErrorsCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class DeleteAdminService {
    async delete(id: string) {
        try {
            const deleted = await prismaClient.admin.delete({where: {id}});
            if (!deleted) {
                throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR);
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2025") {
                throw new Error("Admin not found.");
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR)
        }
    }
}