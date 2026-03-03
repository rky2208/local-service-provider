import { Router } from "express";
import authRoute from "./auth.route";
import providerRoute from "./provider.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/provider", providerRoute);

export default router;
