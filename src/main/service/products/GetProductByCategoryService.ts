import { PrismaClient, Product, Category } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { errors_product_code } from "../../utils/ErrorsCode";

export class GetProductByCategoryService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    public async get(category: string): Promise<Product[]> {
        try {
            if (!Object.values(Category).includes(category as Category)) {
                throw new Error("Categoria inválida");
            }

            const products = await this.prismaClient.product.findMany({
                where: {
                    category: category as Category, // Garantir que a categoria seja do tipo Category
                },
            });

            if (!products || products.length === 0) {
                throw new Error("Não foi encontrado produtos com essa categoria");
            }

            return products;

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