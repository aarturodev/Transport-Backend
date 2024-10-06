import { Router } from "express";

import { ReporteController } from '../controllers/reporte.controller.js';

const router = Router();

router.get('/reporte',ReporteController.getReporte);
router.post('/reporte',ReporteController.verificarReporte);


export default router;