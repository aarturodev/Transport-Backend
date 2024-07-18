import { getConnection } from '../../config/conexion.js';

export class UserModel {

    static async login(username, password) {
         const pool = await getConnection();
         const query = `
            SELECT u.Id, CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) as Nombre, Roles.Descripcion AS Rol
            FROM Usuario as u
            INNER JOIN Roles ON u.Rol = Roles.Id
            WHERE u.Email = '${username}' AND u.Clave = '${password}'
         `;
         const result = await pool.query(query);
         console.log(result.recordset);
         return result.recordset[0];
         
     }

}