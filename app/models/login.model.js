import { getConnection } from '../../config/conexion.js';

export class LoginModel {
    static async login(username, password) {
         const pool = await getConnection();
         const query = `SELECT * FROM Usuario WHERE Email = '${username}' AND Clave = '${password}'`;
         const result = await pool.query(query);
         console.log(result.recordset);
         return result.recordset[0];
         
     }

}