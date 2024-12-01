import express from "express";
import { obtenerGraph } from "../controllers/graph.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticateJwt);

router.get("/graph", obtenerGraph);

export default router;