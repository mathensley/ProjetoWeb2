import { Request, Response, NextFunction } from "express";
import { Establishment } from "@prisma/client";

const validateEstablishment = (req: Request, res: Response, next: NextFunction): void => {
    const data: Partial<Establishment> = req.body;
    const errors: string[] = [];

    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 3) {
        errors.push("O nome do estabelecimento é obrigatório e deve ter pelo menos 3 caracteres.");
    }

    if (!data.address || typeof data.address !== "string") {
        errors.push("O endereço é obrigatório e deve ser um texto válido.");
    }

    if (!data.city || typeof data.city !== "string") {
        errors.push("A cidade é obrigatória e deve ser um texto válido.");
    }

    if (!data.state || typeof data.state !== "string" || data.state.length !== 2) {
        errors.push("O estado é obrigatório e deve ter exatamente 2 caracteres (ex: 'SP', 'RJ').");
    }

    if (!data.cep || typeof data.cep !== "string" || !/^\d{5}-\d{3}$/.test(data.cep)) {
        errors.push("O CEP deve estar no formato correto: 00000-000.");
    }

    if (!data.email || typeof data.email !== "string" || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
        errors.push("O e-mail é obrigatório e deve ser válido.");
    }

    if (!data.phone || typeof data.phone !== "string" || !/^\d{9,11}$/.test(data.phone)) {
        errors.push("O telefone deve conter 9 a 11 dígitos numéricos.");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
};

export { validateEstablishment };