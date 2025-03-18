import { PrismaClient } from "@prisma/client";
import { errors_product_code } from "../../utils/ErrorsCode";

export class DeleteProductService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async delete(id: string) {
        try {
            const product = await this.prismaClient.product.delete({where: {id}});  

            if (!product) {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }    
        } catch(error: any) {            
            if (error.code == "P2025") {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }

            throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
        }
    }
}