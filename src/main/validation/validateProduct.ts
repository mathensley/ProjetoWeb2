import { Request, Response, NextFunction } from "express";
import { Product } from "@prisma/client";

const ALLOWED_CATEGORIES = ["DOCE", "BOLO", "BEBIDA"];

const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
    const data: Partial<Product> = req.body;
    const errors: string[] = [];

    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 3) {
        errors.push("O nome do produto é obrigatório e deve ter pelo menos 3 caracteres.");
    }

    if (data.description && typeof data.description !== "string") {
        errors.push("A descrição deve ser um texto.");
    }

    if (data.image && typeof data.image !== "string") {
        errors.push("A URL da imagem deve ser um texto.");
    }

    if (!data.category || !ALLOWED_CATEGORIES.includes(data.category)) {
        errors.push(`A categoria deve ser uma das seguintes opções: ${ALLOWED_CATEGORIES.join(", ")}.`);
    }

    if (!data.price || isNaN(Number(data.price)) || Number(data.price) <= 0) {
        errors.push("O preço é obrigatório e deve ser maior que zero.");
    }

    if (typeof data.promotion !== "boolean") {
        errors.push("A promoção deve ser um valor booleano (true ou false).");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
};

export { validateProduct };