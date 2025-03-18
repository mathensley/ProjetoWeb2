import { Request, Response, NextFunction } from "express";
import { DeliveryRider } from "@prisma/client";

const validateDeliveryRider = (req: Request, res: Response, next: NextFunction): void => {
    const data: Partial<DeliveryRider> = req.body;
    const errors: string[] = [];

    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
        errors.push("Nome é obrigatório e deve ser uma string válida.");
    }

    if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
        errors.push("A senha é obrigatória e deve ter pelo menos 6 caracteres.");
    }

    if (!data.cpf || typeof data.cpf !== "string" || !/^\d{11}$/.test(data.cpf)) {
        errors.push("O CPF deve conter exatamente 11 dígitos numéricos.");
    }

    const licensePlateRegex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!data.license_plate || typeof data.license_plate !== "string" || !licensePlateRegex.test(data.license_plate)) {
        errors.push("A placa do veículo deve estar no formato antigo (ABC1234) ou Mercosul (ABC1D23).");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
};

export { validateDeliveryRider };