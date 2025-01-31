import express, {Express, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json" assert { type: "json"};

import clientRoutes from "./route/client/clientRoutes.js"
import productsRouter from "./route/product/RouterProductController.js";
import usersRouter from "./route/user/RouterUserController.js";
import authRouter from "./route/auth/RouterAuthController.js";
import termsRouter from "./route/terms/RouterTerms.js";

const app: Express  = express();
const port: Number  = 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(clientRoutes);
app.use(productsRouter);
app.use(usersRouter);
app.use(authRouter)
app.use(termsRouter)

app.get("/v1", (request: Request, response: Response) => {
    response.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Swagger rodando em  http://localhost:${port}/api-docs`);
});