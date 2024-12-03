import express from "express";
import { obtenerGraph } from "../controllers/graph.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdminOrUser } from "../middlewares/authorization.middleware.js";
const router = express.Router();

router
    .use(authenticateJwt)
    .use(isAdminOrUser);

router.get("/graph", obtenerGraph);

export default router;