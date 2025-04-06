// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadFolder = path.resolve(__dirname, "product_imgs");

// if (!fs.existsSync(uploadFolder)) {
//     fs.mkdirSync(uploadFolder, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadFolder);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         const ext = path.extname(file.originalname);
//         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//     },
// });

// export const upload = multer({ storage });
import multer from "multer";

// Armazena os arquivos apenas no buffer de memória
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limite de 5MB
    }
});