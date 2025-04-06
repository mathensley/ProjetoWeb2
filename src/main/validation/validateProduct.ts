import { Request, Response, NextFunction } from "express";

const ALLOWED_CATEGORIES = ["DOCE", "BOLO", "BEBIDA"];

const validateProduct = (req: Request, res: Response, next: NextFunction): void | Response => {
    const errors: string[] = [];

    const name = req.body.name?.trim();
    const description = req.body.description?.trim();
    const category = req.body.category;
    const price = parseFloat(req.body.price);
    const promotion = req.body.promotion === "true" || req.body.promotion === true;

    if (!name || name.length < 3) {
        errors.push("O nome do produto é obrigatório e deve ter pelo menos 3 caracteres.");
    }

    if (description && typeof description !== "string") {
        errors.push("A descrição deve ser um texto.");
    }

    if (!category || !["DOCE", "BOLO", "BEBIDA"].includes(category)) {
        errors.push("A categoria deve ser uma das seguintes opções: DOCE, BOLO, BEBIDA.");
    }

    if (isNaN(price) || price <= 0) {
        errors.push("O preço é obrigatório e deve ser maior que zero.");
    }

    if (!req.file) {
        errors.push("A imagem do produto é obrigatória.");
    }

    if (req.body.promotion !== undefined && typeof promotion !== "boolean") {
        errors.push("A promoção deve ser um valor booleano (true ou false).");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    req.body.price = price;
    req.body.promotion = promotion;

    next();
};

export { validateProduct };