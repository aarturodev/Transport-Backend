import { getConnection, mssql as sql  } from '../../config/conexion.js';

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

    static async getUsuarioByEmail(email) {
        const pool = await getConnection();
        const query = `
            SELECT u.Id, CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) as Nombre, Roles.Descripcion AS Rol
            FROM Usuario as u
            INNER JOIN Roles ON u.Rol = Roles.Id
            WHERE u.Email = ${email}
        `;
        const result = await pool.query(query);
        return result.recordset[0];
    }

    static async register(data) {
        const pool = await getConnection();
        const query = `
            INSERT INTO Usuario (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Email, Clave, Rol)
            VALUES (@Primer_Nombre, @Segundo_Nombre, @Primer_Apellido, @Segundo_Apellido, @Email, @Clave, @Rol)
        `;
        const result = pool.request()
        .input('Primer_Nombre', sql.VarChar, data.Primer_Nombre)
        .input('Segundo_Nombre', sql.VarChar, data.Segundo_Nombre || null)
        .input('Primer_Apellido', sql.VarChar, data.Primer_Apellido)
        .input('Segundo_Apellido', sql.VarChar, data.Segundo_Apellido || null)
        .input('Email', sql.VarChar, data.Email)
        .input('Clave', sql.VarChar, data.Clave)
        .input('Rol', sql.Int, data.Rol)
        .query(query);
        return result.rowsAffected
    }

    static async getUsers() {
        const pool = await getConnection();
        const query = `
            SELECT u.Id, CONCAT(u.Primer_Nombre, ' ', u.Primer_Apellido) as Nombre, Roles.Descripcion AS Rol, u.Email
            FROM Usuario as u
            INNER JOIN Roles ON u.Rol = Roles.Id
        `;
        const result = await pool.query(query);
        return result.recordset;
    }

}