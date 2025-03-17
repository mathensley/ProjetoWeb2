import { PrismaClient } from '@prisma/client';
import { BcryptUtil } from "../../utils/BCryptUtils";
import { errors_user_code } from "../../utils/ErrorsCode";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CreateClientService {
    private prismaClient: PrismaClient;

    constructor(prismaClient?: PrismaClient) {
        this.prismaClient = prismaClient || new PrismaClient();
    }

    async create(data: {
        name: string;
        username: string;
        password: string;
        cpf: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        cep: string;
        establishmentId?: string;
    }) {
        try {
            if (data.cpf.length != 11) {
                throw new Error("Invalid CPF")
            }
            const hashedPass = await BcryptUtil.hashPassword(data.password)
            const client = await this.prismaClient.client.create({
                data: {
                    name: data.name,
                    username: data.username,
                    password: hashedPass,
                    cpf: data.cpf,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    cep: data.cep,
                    establishmentId: data.establishmentId || null
                }
            });
            return client;
        } catch (error: any) {
            if (error.code === "P2002") {
                throw new Error(errors_user_code.INVALID_USER_BY_ID);
            } else if (error.message === "Invalid CPF") {
                throw error
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR)
        }
    }
}