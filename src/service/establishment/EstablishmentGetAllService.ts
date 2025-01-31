import { Establishment } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";

export class EstablishmentGetAllService {
    public async handle(): Promise<Establishment[]> {
        return await prismaClient.establishment.findMany();
    }
}