import express from "express";
import { registrarEscaneo, sendEndTime } from "../controllers/scan.controller.js";

const router = express.Router();

// ! Revisar quien puede leer el qr, pista un usuario logeado

router
    .post("/", registrarEscaneo)
    .patch("/", sendEndTime);

export default router;
