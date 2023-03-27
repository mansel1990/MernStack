import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import productRoutes from "./routes/ProductRoutes.js";
import { errorHandler, notFound } from "./middleware/ErrorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
app.listen(PORT, console.log(`Server running in dev mode on port ${PORT}`));
