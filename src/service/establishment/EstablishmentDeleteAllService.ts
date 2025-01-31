import { prismaClient } from "../../database/PrismaClient.js";

export class EstablishmentDeleteAllService {

    async handle() {
        await prismaClient.establishment.deleteMany();
    }
}