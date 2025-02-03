import express, {Express, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json" assert { type: "json"};

import clientRoutes from "./route/client/clientRoutes.js";
import deliveryRoutes from "./route/delivery_rider/deliveryRoutes.js"
import productsRouter from "./route/product/RouterProductController.js";
import authRouter from "./route/auth/RouterAuthController.js";
import termsRouter from "./route/terms/RouterTerms.js";
import establishmentsRouter from "./route/establishment/RouterEstablishmentController.js";

const app: Express  = express();
const port: Number  = 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(clientRoutes);
app.use(deliveryRoutes);
app.use(productsRouter);
app.use(authRouter)
app.use(termsRouter)
app.use(establishmentsRouter);

app.get("/v1", (request: Request, response: Response) => {
    response.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Swagger rodando em  http://localhost:${port}/api-docs`);
});