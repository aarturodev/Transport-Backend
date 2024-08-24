import { Router } from "express";
import { ExpedienteController } from "../controllers/expediente.controller.js";
import { verificarToken } from "../middlewares/verificarToken.middleware.js";


const router = Router();


router.get('/motivo-investigacion',ExpedienteController.getMotivoInvestigacion);
router.get('/conducta',ExpedienteController.getConducta);
router.get('/modalidad-servicio', ExpedienteController.getModalidadServicio);
router.get('/tipo-servicio', ExpedienteController.getTipoServicio);
router.get('/sujeto-sancionable', ExpedienteController.getSujetoSancionable);
router.get('/tipo-persona-natural', ExpedienteController.getTipoPersonaNatural);
router.get('/sentido-fallo', ExpedienteController.getSentidoFallo);
router.get('/decision', ExpedienteController.getDecision);
router.get('/decision-segunda-instancia', ExpedienteController.getDecisionSegundaInstancia);
router.get('/tipo-recurso', ExpedienteController.getTipoRecurso);
router.get('/recurso-primera-instancia/:expediente', ExpedienteController.buscarRecursoPrimeraInstancia);
router.get('/recurso-segunda-instancia/:expediente', ExpedienteController.buscarRecursoSegundaInstancia);
router.get('/rec-queja-revocatoria', ExpedienteController.getRecQuejaRevocatoria);
router.get('/des-queja-revocatoria', ExpedienteController.getDecisionQuejaRevocatoria);
router.get('/tipo-resolucion', ExpedienteController.getTipoResolucion);
router.get('/ajuste-derecho-aclaratorio/:expediente', ExpedienteController.buscarAjusteDerAclaratorio);
router.get('/tipo-estado', ExpedienteController.getTipoEstado);
router.get('/nombre-abogado', ExpedienteController.getNombreAbogado);
router.get('/auto-acumulacion/:expediente', ExpedienteController.buscarAutoAcumulacion);
router.get('/pago-valor/:expediente', ExpedienteController.buscarPagoValor);
router.get('/solicitudes-especiales/:expediente', ExpedienteController.buscarSolicitudesEspeciales);
router.get('/tipo-ubicacion', ExpedienteController.getTipoUbicacion);
router.get('/ubicacion-expediente/:expediente', ExpedienteController.buscarUbicacionExpediente);
router.get('/tipo-estado-final', ExpedienteController.getTipoEstadoFinal);

router.get('/:expediente', ExpedienteController.buscarExpediente); //buscar expediente por Numero de expediente
router.get("/tabla/:expediente", ExpedienteController.getExpediente); //buscar estado de expediente por Numero de expediente
router.get("/apertura/:expediente", ExpedienteController.buscarApertura); //buscar apertura por Numero de expediente
router.get("/inhibitorio/:expediente", ExpedienteController.buscarInhibitorio);
router.get("/pruebas/:expediente", ExpedienteController.buscarPruebas);
router.get("/aceptacion-cargos/:expediente", ExpedienteController.buscarAceptacionCargos);
router.get("/fallo/:expediente", ExpedienteController.buscarFallo);
router.get("/queja-revocatoria/:expediente", ExpedienteController.buscarRecQuejaRevocatoria);
router.get('/ejecutoria/:expediente', ExpedienteController.buscarEjecutoria);
router.get('/gestion-cobro/:expediente', ExpedienteController.buscarGestionCobro);
router.get('/estado/:expediente', ExpedienteController.buscarEstado);
router.get('/asignacion/:expediente', ExpedienteController.buscarAsignacion);
router.get('/estado-final/:expediente', ExpedienteController.buscarEstadoFinal);

router.post('/crear-expediente', ExpedienteController.createExpediente); //crear expediente
router.patch("/actualizar-expediente", ExpedienteController.actualizarExpediente); //actualizar expediente
router.patch("/actualizar-apertura", ExpedienteController.actualizarApertura); //actualizar apertura
router.patch("/actualizar-inhibitorio", ExpedienteController.actualizarInhibitorio); //actualizar inhibitorio
router.patch("/actualizar-pruebas", ExpedienteController.actualizarPruebas); //actualizar pruebas
router.patch("/actualizar-aceptacion-cargos", ExpedienteController.actualizarAceptacionCargos); //actualizar aceptacion de cargos
router.patch("/actualizar-fallo", ExpedienteController.actualizarFallo); //actualizar fallo
router.patch("/actualizar-recurso-primera-instancia", ExpedienteController.actualizarRecursoPrimeraInstancia); //actualizar recurso
router.patch("/actualizar-recurso-segunda-instancia", ExpedienteController.actualizarRecursoSegundaInstancia); //actualizar recurso
router.patch("/actualizar-queja-revocatoria", ExpedienteController.actualizarRecQuejaRevocatoria); //actualizar queja revocatoria
router.patch("/actualizar-ejecutoria", ExpedienteController.actualizarEjecutoria); //actualizar ejecutoria
router.patch("/actualizar-gestion-cobro", ExpedienteController.actualizarGestionCobro); //actualizar gestion de cobro
router.patch("/actualizar-ajuste-derecho-aclaratorio", ExpedienteController.actualizarAjusteDerAclaratorio); //actualizar ajuste derecho aclaratorio
router.patch("/actualizar-estado", ExpedienteController.actualizarEstado); //actualizar estado expediente
router.patch("/actualizar-asignacion", ExpedienteController.actualizarAsignacion); //actualizar asignacion expediente
router.patch("/actualizar-auto-acumulacion", ExpedienteController.actualizarAutoAcumulacion); //actualizar auto acumulacion expediente
router.patch("/actualizar-pago-valor", ExpedienteController.actualizarPagoValor); //actualizar pago valor expediente
router.patch("/actualizar-solicitudes-especiales", ExpedienteController.actualizarSolicitudesEspeciales); //actualizar solicitudes especiales expediente
router.patch("/actualizar-ubicacion-expediente", ExpedienteController.actualizarUbicacionExpediente); //actualizar ubicacion expediente

router.patch("/actualizar-estado-final", ExpedienteController.actualizarEstadoFinal); //actualizar estado final expediente



export default router;