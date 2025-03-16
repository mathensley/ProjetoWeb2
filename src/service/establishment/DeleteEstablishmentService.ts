import { prismaClient } from "../../database/PrismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_establishment_code } from "../../utils/ErrorsCode";

export class DeleteEstablishmentService {

    async delete(id: string) {
        try {
            const establishment = await prismaClient.establishment.delete({where: {id}}); 

            if (!establishment) {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            } 
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2025") {
                throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
            } 
            
            throw new Error(errors_establishment_code.INVALID_ESTABLISHMENT_BY_ID);
        }
    }
}