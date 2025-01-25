import express, {Express, Request, Response } from "express";
import testeRouter from "./routes/RouterController.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json";

const app: Express  = express();
const port: Number  = 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))


app.use(testeRouter);


app.get("/", (request: Request, response: Response) => {
    response.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Swagger rodando em http://localhost:${port}/api-docs`);
});
