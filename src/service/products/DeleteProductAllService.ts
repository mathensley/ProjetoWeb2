import { prismaClient } from "../../database/PrismaClient.js";

export class ProductDeleteAllService {

    async handle() {
        await prismaClient.product.deleteMany();
    }
}