import { ExpedienteModel } from '../models/expediente.model.js';
import jwt from 'jsonwebtoken';

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

    
     
}