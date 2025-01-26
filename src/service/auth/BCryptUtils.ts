import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class BCrtyptUtils {
    static async hashPassword(password: string): Promise<string> {
        const saltRounds: number = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword;
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        const isMath = await bcrypt.compare(password, hash);
        return isMath;
    }

    static async getCpfByToken(token: string): Promise<string> {
        const { cpf } = jwt.decode(token) as {cpf: "string", iat: number};
        return cpf;
    }
}