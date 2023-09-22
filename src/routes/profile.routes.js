import { Router } from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { checkToken } from "../middlewares/auth.middleware.js";

const router = Router();

// router.method('path', middleware, controller);
router.get("/me", checkToken, getProfile);

export default router;
