import { Request, Response, NextFunction } from "express";
import { Client } from "@prisma/client";

const validateClient = (req: Request, res: Response, next: NextFunction) => {
    const data: Partial<Client> = req.body;
    const errors: string[] = [];

    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
        errors.push("Nome é obrigatório e deve ser uma string válida.");
    }

    if (!data.username || typeof data.username !== "string" || data.username.trim().length < 3) {
        errors.push("Username é obrigatório e deve ter pelo menos 3 caracteres.");
    }

    if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
        errors.push("Senha é obrigatória e deve ter pelo menos 6 caracteres.");
    }

    if (!data.cpf || !/^\d{11}$/.test(data.cpf)) {
        errors.push("CPF é obrigatório e deve conter 11 dígitos numéricos.");
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("E-mail inválido.");
    }

    if (!data.phone || !/^\d{9,11}$/.test(data.phone)) {
        errors.push("Telefone deve conter de 9 a 11 dígitos numéricos.");
    }

    if (!data.address || typeof data.address !== "string" || data.address.trim().length === 0) {
        errors.push("Endereço é obrigatório.");
    }

    if (!data.city || typeof data.city !== "string" || data.city.trim().length === 0) {
        errors.push("Cidade é obrigatória.");
    }

    if (!data.state || typeof data.state !== "string" || data.state.length !== 2) {
        errors.push("Estado deve conter exatamente 2 caracteres (sigla).");
    }

    if (!data.cep || !/^\d{8}$/.test(data.cep)) {
        errors.push("CEP deve conter exatamente 8 dígitos numéricos.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

export default validateClient;