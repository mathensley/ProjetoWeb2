import { prismaClient } from "../../database/PrismaClient.js";
import { errors_product_code } from "../../utils/ErrorsCode.js";
import { Product } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class ProductDeleteUniqueService {

    async handle(id: string) {
        try {
            await prismaClient.product.deleteMany({where: {id}});       
        } catch(error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
                throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
            } 
        }
    }
}