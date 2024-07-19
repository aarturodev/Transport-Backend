import { getConnection, mssql as sql } from '../../config/conexion.js';

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

     static async createExpediente(data) {
         const pool = await getConnection();
         const query = `
            INSERT INTO Expediente
                (Numero_Expediente
                ,Ultima_Modificacion
                ,Motivo_Investigacion_Id
                ,Numero_Informe_Infraccion
                ,Fecha_Hechos
                ,Fecha_Caducidad
                ,Placa
                ,Clase_Infraccion_Id
                ,Modalidad_Servicio_Id
                ,Tipo_Servicio_Id
                ,Sujeto_Sancionable_Id
                ,Tipo_Persona_Natural_Id
                ,Identificacion
                ,Nombre_Persona_Natural
                ,Usuario_Id)
            OUTPUT 
                INSERTED.Numero_Expediente
                ,INSERTED.Id
            VALUES
                (@Numero_Expediente
                ,@Ultima_Modificacion
                ,@Motivo_Investigacion_Id
                ,@Numero_Informe_Infraccion
                ,@Fecha_Hechos
                ,@Fecha_Caducidad
                ,@Placa
                ,@Clase_Infraccion_Id
                ,@Modalidad_Servicio_Id
                ,@Tipo_Servicio_Id
                ,@Sujeto_Sancionable_Id
                ,@Tipo_Persona_Natural_Id
                ,@Identificacion
                ,@Nombre_Persona_Natural
                ,@Usuario_Id)`;

        const result = await pool.request()
            .input('Numero_Expediente', sql.NVarChar, data.Numero_Expediente)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .input('Motivo_Investigacion_Id', sql.Int, data.Motivo_Investigacion_Id)
            .input('Numero_Informe_Infraccion', sql.NVarChar, data.Numero_Informe_Infraccion)
            .input('Fecha_Hechos', sql.DateTime, data.Fecha_Hechos)
            .input('Fecha_Caducidad', sql.DateTime, data.Fecha_Caducidad)
            .input('Placa', sql.NVarChar, data.Placa)
            .input('Clase_Infraccion_Id', sql.Int, data.Clase_Infraccion_Id)
            .input('Modalidad_Servicio_Id', sql.Int, data.Modalidad_Servicio_Id)
            .input('Tipo_Servicio_Id', sql.Int, data.Tipo_Servicio_Id)
            .input('Sujeto_Sancionable_Id', sql.Int, data.Sujeto_Sancionable_Id)
            .input('Tipo_Persona_Natural_Id', sql.Int, data.Tipo_Persona_Natural_Id)
            .input('Identificacion', sql.Int, data.Identificacion)
            .input('Nombre_Persona_Natural', sql.NVarChar, data.Nombre_Persona_Natural)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .query(query);

         
         if(result.rowsAffected[0] === 1){
            const expedienteId = result.recordset[0].Id;
            // aqui hacemos las demas queries
            const datos = {
               Ultima_Modificacion: data.Ultima_Modificacion,
               Usuario_Id: data.Usuario_Id,
               Expediente_Id: expedienteId,
            }
            await this.agregarApertura(datos);
            await this.agregarInhibitorio(datos);
            await this.agregarAutoAcumulacion(datos);
            await this.agregarPruebas(datos);
            await this.agregarAceptacionCargos(datos);
            await this.agregarFallo(datos);
            await this.agregarRecursoPrimeraInstancia(datos);
            await this.agregarRecursoSegundaInstancia(datos);
            await this.agregarRecursoQuejaRenDirecta(datos);
            await this.agregarEjecutoria(datos);
            await this.agregarGestionCobro(datos);
            await this.agregarAjusteDerAclaratorio(datos);
            await this.agregarEstado(datos);
            await this.agregarAsignacion(datos);

            return data.Numero_Expediente;
            
           
         }
         return false;
     }

     static async verificarExistencia(NumeroExpediente){
         const pool = await getConnection();
         const query = 'SELECT * FROM Expediente WHERE Numero_Expediente = @Numero_Expediente'
         const result = await pool.request()
            .input('Numero_Expediente', sql.NVarChar, NumeroExpediente)
            .query(query)

         return result.rowsAffected[0] > 0;
     }

     static async agregarApertura(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Apertura 
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

      static async agregarInhibitorio(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Inhibitorio
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarAutoAcumulacion(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Auto_Acumulacion
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarPruebas(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Pruebas
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarAceptacionCargos(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Aceptacion_Cargos
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarFallo(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Fallo
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarRecursoPrimeraInstancia(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Recurso_Primera_Instancia
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarRecursoSegundaInstancia(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Recurso_Segunda_Instancia
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarRecursoQuejaRenDirecta(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Recurso_Queja_Revoc_Directa
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarEjecutoria(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Ejecutoria
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarGestionCobro(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Gestion_Cobro
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarAjusteDerAclaratorio(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Ajuste_Derec_Aclarat
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async agregarEstado(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Estado
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     
     static async agregarAsignacion(datos){
         const pool = await getConnection();
         const query = `
               INSERT INTO Asignacion
                      (Expediente_Id
                      ,Ultima_Modificacion
                      ,Usuario_Id) 
                     VALUES 
                      (@Expediente_Id
                      ,@Ultima_Modificacion
                      ,@Usuario_Id)`;
   
         const result = await pool.request()
               .input('Expediente_Id', sql.Int, datos.Expediente_Id)
               .input('Ultima_Modificacion', sql.DateTime, datos.Ultima_Modificacion)
               .input('Usuario_Id', sql.Int, datos.Usuario_Id)
               .query(query);
   
         return result.rowsAffected[0] === true ? expedienteId : false;

     }

     static async getExpedienteById(id){
            const pool = await getConnection();
            const query1 = 'SELECT * FROM Expediente WHERE Id = @id';
            const query = `
                  SELECT 
                   e.Numero_Expediente
                   ,e.Ultima_Modificacion
                   ,mi.Descripcion AS Motivo_Investigacion
                   ,e.Numero_Informe_Infraccion
                   ,e.Fecha_Hechos
                   ,e.Fecha_Caducidad
                   ,e.Placa
                   ,ci.Descripcion AS Clase_Infraccion
                   ,ms.Descripcion AS Modalidad_Servicio
                   ,ts.Descripcion AS Tipo_Servicio
                   ,ss.Descripcion AS Sujeto_Sancionable
                   ,tpn.Descripcion AS Tipo_Persona_Natural
                   ,e.Identificacion
                   ,e.Nombre_Persona_Natural
                   ,e.Usuario_Id
                  FROM Expediente e
                  INNER JOIN Motivo_Investigacion mi ON e.Motivo_Investigacion_Id = mi.Id
                  INNER JOIN Clase_Infraccion ci ON e.Clase_Infraccion_Id = ci.Id
                  INNER JOIN Modalidad_Servicio ms ON e.Modalidad_Servicio_Id = ms.Id
                  INNER JOIN Tipo_Servicio ts ON e.Tipo_Servicio_Id = ts.Id
                  INNER JOIN Sujeto_Sancionable ss ON e.Sujeto_Sancionable_Id = ss.Id
                  INNER JOIN Tipo_Persona_Natural tpn ON e.Tipo_Persona_Natural_Id = tpn.Id
                  WHERE e.Id = @id`;
      
              const result = await pool.request()
                  .input('id', sql.Int, id)
                  .query(query1);
      
              return result.recordset[0];
     }

     static async buscarExpediente(expediente){
            const pool = await getConnection();
            const query1 = 'SELECT * FROM Expediente WHERE Numero_Expediente = @expediente';
            const query = `
                  SELECT 
                   e.Numero_Expediente
                   ,e.Ultima_Modificacion
                   ,mi.Descripcion AS Motivo_Investigacion
                   ,e.Numero_Informe_Infraccion
                   ,e.Fecha_Hechos
                   ,e.Fecha_Caducidad
                   ,e.Placa
                   ,ci.Descripcion AS Clase_Infraccion
                   ,ms.Descripcion AS Modalidad_Servicio
                   ,ts.Descripcion AS Tipo_Servicio
                   ,ss.Descripcion AS Sujeto_Sancionable
                   ,tpn.Descripcion AS Tipo_Persona_Natural
                   ,e.Identificacion
                   ,e.Nombre_Persona_Natural
                   ,e.Usuario_Id
                  FROM Expediente e
                  INNER JOIN Motivo_Investigacion mi ON e.Motivo_Investigacion_Id = mi.Id
                  INNER JOIN Clase_Infraccion ci ON e.Clase_Infraccion_Id = ci.Id
                  INNER JOIN Modalidad_Servicio ms ON e.Modalidad_Servicio_Id = ms.Id
                  INNER JOIN Tipo_Servicio ts ON e.Tipo_Servicio_Id = ts.Id
                  INNER JOIN Sujeto_Sancionable ss ON e.Sujeto_Sancionable_Id = ss.Id
                  INNER JOIN Tipo_Persona_Natural tpn ON e.Tipo_Persona_Natural_Id = tpn.Id
                  WHERE e.Id = @id`;
      
              const result = await pool.request()
                  .input('expediente', sql.NVarChar, expediente)
                  .query(query1);
      
              return result.recordset[0];
     }




}