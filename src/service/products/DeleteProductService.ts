import { prismaClient } from "../../database/PrismaClient";
import { errors_product_code } from "../../utils/ErrorsCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class DeleteProductService {

    async delete(id: string) {
        try {
            const product = await prismaClient.product.delete({where: {id}});  

            if (!product) {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }    
        } catch(error: unknown) {            
            if (error instanceof PrismaClientKnownRequestError && error.code == "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }

            throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
        }
    }
}