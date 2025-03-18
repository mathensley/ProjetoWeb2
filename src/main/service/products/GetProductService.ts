import { PrismaClient, Product } from "@prisma/client";

export class GetProductService {
    private prismaClient: PrismaClient;
    
    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    public async get(page: any = 1, size: any = 10): Promise<Product[]> {
        try {
            let pageTransformer = Number(page);
            let sizeTransformer = Number(size);

            if (pageTransformer <= 0 || sizeTransformer <= 0) {
                throw new Error("Insira um valor maior que 0 para page e size")
            }

            const skip: number = (pageTransformer - 1) * sizeTransformer;

            return await this.prismaClient.product.findMany({
                skip: skip,
                take: sizeTransformer
            });
        } catch(error: any) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Ocorreu um erro inesperado");
        }
    }
}