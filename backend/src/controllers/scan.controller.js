import { AppDataSource } from "../config/configDb.js";
import { Scan } from "../entity/Scan.js";

export async function registrarEscaneo (req, res) {
  try {
    const { qrContent, name, email, scanStartTime } = req.body;
    const scanRepository = AppDataSource.getRepository(Scan);
    const newScan = scanRepository.create({
      qrContent,
      name,
      email,
      scanStartTime,
    });

    await scanRepository.save(newScan);
    res.status(201).json({ message: "Escaneo registrado exitosamente", data: newScan });
  } catch (error) {
    console.error("Error al registrar el escaneo:", error);
    res.status(500).json({ message: "Error al registrar el escaneo" });
  }
}

export async function sendEndTime(req, res) {
    try {
      const { body } = req;
      const { id } = req.query;
      const scanRepository = AppDataSource.getRepository(Scan);

      const scanFound = await scanRepository.findOne({
        where: { id },
      });

      if (!scanFound) return res.status(404).json({
        message: "Escaneo no encontrado"
      });

      const dataScanUpdate = {
        qrContent: scanFound.qrContent,
        name: scanFound.name,
        email: scanFound.email,
        scanStartTime: scanFound.scanTime,
        scanEndTime: body.scanEndTime
      }

      await scanRepository.update({ id: id }, dataScanUpdate );

      const scanCheck = await scanRepository.findOne({
        where: { id }
      });

      if (!scanCheck) return res.status(404).json({
        message: "Escaneo no encontrado despues de actualizar"
      });

      res.status(200).json({
        message: "Escaneo modificado con exito",
        data: scanCheck
      })
    } catch (error) {
      console.error("Error: ", error)
    }
}