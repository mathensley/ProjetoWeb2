import { prismaClient } from "../../database/PrismaClient.js";

export class ProductDeleteAllService {

    async handle() {
        prismaClient.user.deleteMany();
    }
}