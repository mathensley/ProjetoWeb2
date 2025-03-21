import { Establishment } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient";

export class GetEstablishmentService {
    public async get(): Promise<Establishment[]> {
        return await prismaClient.establishment.findMany();
    }
}