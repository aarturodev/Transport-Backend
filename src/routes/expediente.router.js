import { Router } from "express";
import { ExpedienteController } from "../controllers/expediente.controller.js";


const router = Router();


router.get('/motivo-investigacion', ExpedienteController.getMotivoInvestigacion);
router.get('/conducta', ExpedienteController.getConducta);
router.get('/modalidad-servicio', ExpedienteController.getModalidadServicio);
router.get('/tipo-servicio', ExpedienteController.getTipoServicio);
router.get('/sujeto-sancionable', ExpedienteController.getSujetoSancionable);
router.get('/tipo-persona-natural', ExpedienteController.getTipoPersonaNatural);

export default router;