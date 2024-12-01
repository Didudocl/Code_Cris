import express from "express";
import { generarQRCode, obtenerQRCode } from "../controllers/qrcode.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.use(authenticateJwt);

router.get("/", obtenerQRCode);
router.post("/generate", generarQRCode);

export default router;
