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

     static async createExpediente(req, res) {
          try{
               console.log(req.body);
               
               const {Numero_Expediente} = req.body
               const exist = await ExpedienteModel.verificarExistencia(Numero_Expediente)
          
               if(exist){
                    return res.json({message : 'El expediente ya existe'})
               }

               const result = await ExpedienteModel.createExpediente(req.body);

               if(!result){
                    return res.json({ message: 'No se pudo crear el expediente' });
               }

               return res.status(201).json({message: 'Expediente creado', result});
          }
          catch(error){
               console.error("este es el error: ",error);
               return res.status(500).json({ message: 'Internal server error' });
          }
     }

     static async getExpedienteById(req, res) {
          try{
               console.log(req.params.id );
               const result = await ExpedienteModel.getExpedienteById(req.params.id);
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
    

    
     
}