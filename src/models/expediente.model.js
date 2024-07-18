import { getConnection } from '../../config/conexion.js';

export class ExpedienteModel {

    static async getMotivoInvestigacion() {

        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Motivo_Investigacion';
        const result = await pool.query(query);
        return result.recordset;
          

     }

      static async getConducta() {

        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Clase_Infraccion';
        const result = await pool.query(query);
        return result.recordset;

     }

     static async getModalidadServicio() {

        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Modalidad_Servicio';
        const result = await pool.query(query);
        return result.recordset;

     }

     static async getTipoServicio() {

        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Tipo_Servicio';
        const result = await pool.query(query);
        console.log(result.recordset);
        return result.recordset;

     }

     static async getSujetoSancionable() {

        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Sujeto_Sancionable';
        const result = await pool.query(query);
        return result.recordset; 

     }

     static async getTipoPersonaNatural() {

        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Tipo_Persona_Natural';
        const result = await pool.query(query);
        return result.recordset;

     }

}