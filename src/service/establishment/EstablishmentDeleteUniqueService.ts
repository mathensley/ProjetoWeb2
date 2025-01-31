import { prismaClient } from "../../database/PrismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode.js";

export class EstablishmentDeleteUniqueService {

    async handle(id: string) {
        try {
            await prismaClient.establishment.deleteMany({where: {id}});       
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
                throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
            } 
        }
    }
}