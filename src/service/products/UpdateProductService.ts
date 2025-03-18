import { PrismaClient, Product } from "@prisma/client";
import { Decimal, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode";

export class UpdateProductService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }
    
    async update(id: string, product: Partial<Product>): Promise<Product> {
        
        try {
            if (product.price && product.price <= new Decimal(`${0}`)) {
                throw new Error(errors_product_code.INVALID_PRODUCT_PRICE);
            }
            if ((product.name && product.name.length <= 3)) {
                throw new Error(errors_product_code.INVALID_PRODUCT_NAME);
            }
            if (product.name == "") {
                throw new Error(errors_product_code.INVALID_PRODUCT_NAME);
            }
            
            const response = await this.prismaClient.product.update({where: {id}, data: product});
            return response;
        } catch(error: any) {
            if (error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            } else if (error.message == errors_product_code.INVALID_PRODUCT_PRICE) {
                throw error;
            } else if (error.message == errors_product_code.INVALID_PRODUCT_NAME) {
                throw error;
            }
            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}