import { PrismaClient, Product } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode";

export class GetProductByIdService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    public async get(id: string): Promise<Product[]> {
        try {
            const product = await this.prismaClient.product.findUnique({where: {id}});

            if (!product) {
                throw new Error(errors_product_code.INVALID_PRODUCT_BY_ID);
            }

            return [product];

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_product_code.INVALID_PRODUCT_ALREADY_EXIST);
            }


            throw new Error(errors_product_code.INVALID_UNRECOGNIZED_ERROR);
        }
    }
}