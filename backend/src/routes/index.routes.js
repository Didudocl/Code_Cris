"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import scanRoutes from "./scan.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/scan", scanRoutes)
    .use("/user", userRoutes);

export default router;