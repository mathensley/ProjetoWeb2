import express, {Express, Request, Response } from "express";
import testeRouter from "./routes/RouterController.js";
import cors from "cors";

const app: Express  = express();
const port: Number  = 3000;

app.use(cors());
app.use(express.json());

app.use(testeRouter);

app.get("/", (request: Request, response: Response) => {
    response.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
