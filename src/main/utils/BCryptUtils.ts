import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class BcryptUtil {
    static async hashPassword(password: string): Promise<string> {
        const saltRounds: number = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword;
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        const isMath = await bcrypt.compare(password, hash);
        return isMath;
    }

    static async getId(token: string): Promise<string> {
        const { id } = jwt.decode(token) as {id: "string", iat: number};
        return id;
    }
}