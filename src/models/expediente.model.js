import { getConnection } from '../../config/conexion.js';

export class ExpedienteModel {

    static async getMotivoInvestigacion() {

        const pool = await getConnection();
        const query = 'SELECT * FROM Motivo_Investigacion';
        const result = await pool.query(query);
        pool.close();
        return result.recordset;
          

     }

      static async getConducta() {

        const pool = await getConnection();
        const query = 'SELECT * FROM Clase_Infraccion';
        const result = await pool.query(query);
        pool.close();
        return result.recordset;

     }

     static async getModalidadServicio() {

        const pool = await getConnection();
        const query = 'SELECT * FROM Modalidad_Servicio';
        const result = await pool.query(query);
        pool.close();
        return result.recordset;

     }

     static async getTipoServicio() {

        const pool = await getConnection();
        const query = 'SELECT * FROM Tipo_Servicio';
        const result = await pool.query(query);
        pool.close();
        console.log(result.recordset);
        return result.recordset;

     }

     static async getSujetoSancionable() {

        const pool = await getConnection();
        const query = 'SELECT * FROM Sujeto_Sancionable';
        const result = await pool.query(query);
        pool.close();
        return result.recordset; 

     }

     static async getTipoPersonaNatural() {

        const pool = await getConnection();
        const query = 'SELECT * FROM Tipo_Persona_Natural';
        const result = await pool.query(query);
        pool.close();
        return result.recordset;

     }

}