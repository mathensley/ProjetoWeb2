import { User } from "@prisma/client";
import { prismaClient } from "../../database/PrismaClient.js";
import { BcryptUtil } from "../../utils/BCryptUtils.js";
import { errors_user_code } from "../../utils/ErrorsCode.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class RegisterUserService {
    public async register(name: string, cpf: string, password: string, role: string): Promise<User> {

        try {
            const hashPassword = await BcryptUtil.hashPassword(password);
            const result = prismaClient.user.create({data: {name, cpf, password: hashPassword, role}});
            return result;

        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error(errors_user_code.INVALID_USER_ALREADY_EXISTS);
            }
            throw new Error(errors_user_code.INVALID_UNRECOGNIZED_ERROR)
        }
    }
}