import { ExpedienteModel } from '../models/expediente.model.js';


export class ExpedienteController {

     static async getMotivoInvestigacion(req, res) {
               
               try{
                    const result = await ExpedienteModel.getMotivoInvestigacion();
                    res.json(result);
               }
               catch(error){
                    console.error("este es el error: ",error);
                    return res.status(500).json({ message: 'Internal server error' });

               }
     }

      static async getConducta(req, res) {

          try{
               const result = await ExpedienteModel.getConducta();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getModalidadServicio(req, res) {

          try{
               const result = await ExpedienteModel.getModalidadServicio();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }

     }

     static async getTipoServicio(req, res) {

          try{
               const result = await ExpedienteModel.getTipoServicio();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }

     }

     static async getSujetoSancionable(req, res) {

          try{
               const result = await ExpedienteModel.getSujetoSancionable();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }

     }

     static async getTipoPersonaNatural(req, res) {

          try{
               const result = await ExpedienteModel.getTipoPersonaNatural();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }

     }

     static async getTipoEstado(req, res) {
               
               try{
                    const result = await ExpedienteModel.getTipoEstado();
                    res.json(result);
               }
               catch(error){
                    console.error("este es el error: ",error);
                    return res.status(500).json({ message: 'Internal server error' });
               }
     }

     static async getNombreAbogado(req, res) {
                    
          try{
               const result = await ExpedienteModel.getNombreAbogado();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });

          }
     }

     static async createExpediente(req, res) {
          try{
               console.log(req.body);
               
               const {Numero_Expediente} = req.body
               const exist = await ExpedienteModel.verificarExistencia(Numero_Expediente)
          
               if(exist){
                    return res.status(409).json({message : 'El expediente ya existe'})
               }

               const result = await ExpedienteModel.createExpediente(req.body);

               if(!result){
                    return res.json({ message: 'No se pudo crear el expediente' });
               }

               return res.json({ message: 'Expediente creado', result });

          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }


     static async buscarExpediente(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarExpediente(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Expediente no encontrado' });
               }
               res.json({ message: 'Expediente encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getExpediente(req, res) {
          try{
               const result = await ExpedienteModel.getExpediente(req.params.expediente);
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarExpediente(req, res) {
          try{
               const result = await ExpedienteModel.actualizarExpediente(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Expediente no encontrado' });
               }
               return res.json({ message: 'Expediente actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarApertura(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarApertura(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Expediente no encontrado' });
               }
               return res.json({ message: 'Apertura actualizada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarApertura(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarApertura(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Apertura no encontrada' });
               }
               res.json({ message: 'Apertura encontrada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }
     static async buscarInhibitorio(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarInhibitorio(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'inhibitorio no encontrado' });
               }
               res.json({ message: 'Inhibitorio encontrada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarInhibitorio(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarInhibitorio(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Inhibitorio no encontrado' });
               }
               return res.json({ message: 'Inhibitorio actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }
    
     static async buscarPruebas(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarPruebas(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Pruebas no encontradas' });
               }
               res.json({ message: 'Pruebas encontradas', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarPruebas(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarPruebas(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Pruebas no encontradas' });
               }
               return res.json({ message: 'Pruebas actualizadas', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarAceptacionCargos(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarAceptacionCargos(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Aceptacion de cargos no encontrada' });
               }
               res.json({ message: 'Aceptacion de cargos encontrada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarAceptacionCargos(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarAceptacionCargos(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Aceptacion de cargos no encontrada' });
               }
               return res.json({ message: 'Aceptacion de cargos actualizada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getSentidoFallo(req, res) {
          try{
               const result = await ExpedienteModel.getSentidoFallo();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }


     static async buscarFallo(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarFallo(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Fallo no encontrado' });
               }
               res.json({ message: 'Fallo encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarFallo(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarFallo(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Fallo no encontrado' });
               }
               return res.json({ message: 'Fallo actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

      static async getDecision(req, res) {
          try{
               const result = await ExpedienteModel.getDecision();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getTipoRecurso(req, res) {
          try{
               const result = await ExpedienteModel.getTipoRecurso();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarRecursoPrimeraInstancia(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarRecursoPrimeraInstancia(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Recurso de primera instancia no encontrado' });
               }
               res.json({ message: 'Recurso de primera instancia encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarRecursoPrimeraInstancia(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarRecursoPrimeraInstancia(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Recurso de primera instancia no encontrado' });
               }
               return res.json({ message: 'Recurso de primera instancia actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

      static async getDecisionSegundaInstancia(req, res) {
          try{
               const result = await ExpedienteModel.getDecisionSegundaInstancia();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarRecursoSegundaInstancia(req, res) {

          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarRecursoSegundaInstancia(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Recurso de segunda instancia no encontrado' });
               }
               res.json({ message: 'Recurso de segunda instancia encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarRecursoSegundaInstancia(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarRecursoSegundaInstancia(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Recurso de segunda instancia no encontrado' });
               }
               return res.json({ message: 'Recurso de segunda instancia actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getRecQuejaRevocatoria(req, res) {
          try{
               const result = await ExpedienteModel.getRecQuejaRevocatoria();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getDecisionQuejaRevocatoria(req, res) {
          try{
               const result = await ExpedienteModel.getDecisionQuejaRevocatoria();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarRecQuejaRevocatoria(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarRecQuejaRevocatoria(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Rec Queja Revocatoria no encontrado' });
               }
               res.json({ message: 'Rec Queja Revocatoria encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarRecQuejaRevocatoria(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarRecQuejaRevocatoria(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Rec Queja Revocatoria no encontrado' });
               }
               return res.json({ message: 'Rec Queja Revocatoria actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarEjecutoria(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarEjecutoria(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Ejecutoria no encontrada' });
               }
               res.json({ message: 'Ejecutoria encontrada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarEjecutoria(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarEjecutoria(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Ejecutoria no encontrada' });
               }
               return res.json({ message: 'Ejecutoria actualizada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarGestionCobro(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarGestionCobro(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Gestion de cobro no encontrada' });
               }
               res.json({ message: 'Gestion de cobro encontrada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarGestionCobro(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarGestionCobro(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Gestion de cobro no encontrada' });
               }
               return res.json({ message: 'Gestion de cobro actualizada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getTipoResolucion(req, res) {
          try{
               const result = await ExpedienteModel.getTipoResolucion();
               res.json(result);
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarAjusteDerAclaratorio(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarAjusteDerAclaratorio(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Ajuste Derecho Aclaratorio no encontrado' });
               }
               res.json({ message: 'Ajuste Derecho Aclaratorio encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarAjusteDerAclaratorio(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarAjusteDerAclaratorio(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Ajuste Derecho Aclaratorio no encontrado' });
               }
               return res.json({ message: 'Ajuste Derecho Aclaratorio actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarEstado(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarEstado(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Estado no encontrado' });
               }
               res.json({ message: 'Estado encontrado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarEstado(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarEstado(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Estado no encontrado' });
               }
               return res.json({ message: 'Estado actualizado', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async buscarAsignacion(req, res) {
          try{
               console.log(req.params.expediente );
               const result = await ExpedienteModel.buscarAsignacion(req.params.expediente);
               if(!result){
                    return res.status(404).json({ message: 'Asignacion no encontrada' });
               }
               res.json({ message: 'Asignacion encontrada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async actualizarAsignacion(req, res) {
          try{
               console.log(req.body);
               const result = await ExpedienteModel.actualizarAsignacion(req.body);
               if(!result){
                    return res.status(404).json({ message: 'Asignacion no encontrada' });
               }
               return res.json({ message: 'Asignacion actualizada', result });
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

    
     
}