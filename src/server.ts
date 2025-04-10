import express, {Express, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json";
import path from "path";

import clientRoutes from "./main/route/client/clientRoutes";
import deliveryRoutes from "./main/route/delivery_rider/deliveryRoutes"
import productsRouter from "./main/route/product/RouterProductController";
import cartRoutes from "./main/route/cart/cartRoutes";
import authRouter from "./main/route/auth/RouterAuthController";
import establishmentsRouter from "./main/route/establishment/RouterEstablishmentController";
import adminRoutes from "./main/route/admin/adminRoutes";

const app: Express  = express();
const port: Number  = 3000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.use(clientRoutes);
app.use(deliveryRoutes);
app.use(productsRouter);
app.use(cartRoutes);
app.use(authRouter);
app.use(establishmentsRouter);
app.use(adminRoutes);

app.use("/images/products", express.static(path.join(__dirname, "./main/utils/image/product_imgs")))

app.get("/v1", (request: Request, response: Response) => {
    response.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Swagger rodando em  http://localhost:${port}/api-docs`);
});

export default app;