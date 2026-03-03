import { Router } from "express";
import {
  getProviderProfile,
  addProfileDetails,
} from "../controllers/provider.controller";

const providerRouter = Router();
providerRouter.post("/profile", addProfileDetails);
providerRouter.get("/profile", getProviderProfile);

export default providerRouter;
