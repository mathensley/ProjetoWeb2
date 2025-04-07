import multer from "multer";

// Armazena os arquivos apenas no buffer de memória
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limite de 5MB
    }
});