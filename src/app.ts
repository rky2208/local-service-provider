import express from "express";
import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
const appClient = express();

appClient.use(express.json());
// Mount all routes under /api
appClient.use("/api", routes);
// Global error handler (must be last)
appClient.use(errorMiddleware);

export default appClient;
