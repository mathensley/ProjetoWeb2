import { PrismaClient, Product } from "@prisma/client";
import { errors_product_code } from "../../utils/ErrorsCode";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateProductService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    public async create(data: any): Promise<Product> {
        try {
            if (!data.price || new Decimal(data.price).lte(0)) {
                throw new Error(errors_product_code.INVALID_PRODUCT_PRICE);
            }
    
            if (!data.name || data.name.length <= 3) {
                throw new Error(errors_product_code.INVALID_PRODUCT_NAME);
            }
    
            return await this.prismaClient.product.create({ data });
        } catch (error: any) {
            if (error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            } else if (
                error.message == errors_product_code.INVALID_PRODUCT_PRICE ||
                error.message == errors_product_code.INVALID_PRODUCT_NAME
            ) {
                throw error;
            }
    
            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}