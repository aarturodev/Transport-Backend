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

     static async buscarExpediente(expediente){
            const pool = await getConnection();
            const query = `SELECT * FROM Expediente
                    WHERE Numero_Expediente = @expediente`;
            const result = await pool.request()
                .input('expediente', sql.NVarChar, expediente)
                .query(query);
      
            return result.recordset[0];
     }

     static async getExpediente(expediente){
            const pool = await getConnection();
            const query = `SELECT *
                    FROM Expediente as e
                    INNER JOIN Motivo_Investigacion as mi ON mi.Id = e.Motivo_Investigacion_Id
                    INNER JOIN Clase_Infraccion as ci ON ci.Id = e.Clase_Infraccion_Id
                    WHERE Numero_Expediente = @expediente`;
            const result = await pool.request()
                .input('expediente', sql.NVarChar, expediente)
                .query(query);
      
            return result.recordset[0];
     }

     static async actualizarExpediente(data){
            const pool = await getConnection();
            const query = `
                UPDATE Expediente
                SET
                    Ultima_Modificacion = @Ultima_Modificacion
                    ,Motivo_Investigacion_Id = @Motivo_Investigacion_Id
                    ,Numero_Informe_Infraccion = @Numero_Informe_Infraccion
                    ,Fecha_Hechos = @Fecha_Hechos
                    ,Fecha_Caducidad = @Fecha_Caducidad
                    ,Placa = @Placa
                    ,Clase_Infraccion_Id = @Clase_Infraccion_Id
                    ,Modalidad_Servicio_Id = @Modalidad_Servicio_Id
                    ,Tipo_Servicio_Id = @Tipo_Servicio_Id
                    ,Sujeto_Sancionable_Id = @Sujeto_Sancionable_Id
                    ,Tipo_Persona_Natural_Id = @Tipo_Persona_Natural_Id
                    ,Identificacion = @Identificacion
                    ,Nombre_Persona_Natural = @Nombre_Persona_Natural
                    ,Usuario_Id = @Usuario_Id
                WHERE Numero_Expediente = @Numero_Expediente`;
    
            const result = await pool.request()
                .input('Numero_Expediente', sql.NVarChar, data.Numero_Expediente)
                .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
                .input('Motivo_Investigacion_Id', sql.Int, data.Motivo_Investigacion_Id)
                .input('Numero_Informe_Infraccion', sql.Int, data.Numero_Informe_Infraccion)
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

            return result.rowsAffected[0] === 1;
     }

     static async actualizarApertura(data){
            const pool = await getConnection();
            const query = `
                UPDATE Apertura
                SET
                    Ultima_Modificacion = @Ultima_Modificacion
                    ,Numero_Resolucion = @Numero_Resolucion
                    ,Fecha_Resolucion = @Fecha_Resolucion
                    ,Fecha_Notificacion = @Fecha_Notificacion
                    ,Fecha_Max_Descargos = @Fecha_Max_Descargos
                    ,Numero_radicado = @Numero_radicado
                    ,Fecha_Radicado = @Fecha_Radicado
                    ,Usuario_Id = @Usuario_Id
                WHERE Expediente_Id = @Expediente_Id`;
    
            const result = await pool.request()
                .input('Expediente_Id', sql.Int, data.Expediente_Id)
                .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
                .input('Numero_Resolucion', sql.NVarChar, data.Numero_Resolucion)
                .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
                .input('Fecha_Notificacion', sql.DateTime, data.Fecha_Notificacion)
                .input('Fecha_Max_Descargos', sql.DateTime, data.Fecha_Max_Descargos)
                .input('Numero_radicado', sql.NVarChar, data.Numero_radicado)
                .input('Fecha_Radicado', sql.DateTime, data.Fecha_Radicado)
                .input('Usuario_Id', sql.Int, data.Usuario_Id)
                .query(query);

            return result.rowsAffected[0] === 1;
     }

      static async buscarApertura(expediente){
            const pool = await getConnection();
            const query = `
                  SELECT a.Numero_Resolucion
                        ,a.Fecha_Resolucion
                        ,a.Fecha_Notificacion
                        ,a.Fecha_Max_Descargos
                        ,a.Numero_radicado
                        ,a.Fecha_Radicado
                        ,a.Usuario_Id
                  FROM Apertura as a
                        INNER JOIN Expediente ON Expediente.Id = a.Expediente_Id
                        WHERE Expediente.Numero_Expediente = @expediente`;
            const result = await pool.request()
                .input('expediente', sql.NVarChar, expediente)
                .query(query);
      
            return result.recordset[0];
     }

      static async buscarInhibitorio(expediente){
            const pool = await getConnection();
            const query = `
                  SELECT i.Numero_Resolucion
                        ,i.Fecha_Resolucion
                        ,i.Fecha_Comunicacion
                  FROM Inhibitorio as i
                        INNER JOIN Expediente ON Expediente.Id = i.Expediente_Id
                        WHERE Expediente.Numero_Expediente = @expediente`;
            const result = await pool.request()
                .input('expediente', sql.NVarChar, expediente)
                .query(query);
      
            return result.recordset[0];
     }

     static async actualizarInhibitorio(data){
            const pool = await getConnection();
            const query = `
                UPDATE Inhibitorio
                SET
                    Ultima_Modificacion = @Ultima_Modificacion
                    ,Numero_Resolucion = @Numero_Resolucion
                    ,Fecha_Resolucion = @Fecha_Resolucion
                    ,Fecha_Comunicacion = @Fecha_Comunicacion
                    ,Usuario_Id = @Usuario_Id
                WHERE Expediente_Id = @Expediente_Id`;
    
            const result = await pool.request()
                .input('Expediente_Id', sql.Int, data.Expediente_Id)
                .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
                .input('Numero_Resolucion', sql.NVarChar, data.Numero_Resolucion)
                .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
                .input('Fecha_Comunicacion', sql.DateTime, data.Fecha_Comunicacion)
                .input('Usuario_Id', sql.Int, data.Usuario_Id)
                .query(query);

            return result.rowsAffected[0] === 1;
     }

    static async buscarPruebas(expediente){
        const pool = await getConnection();
        const query = `
                SELECT p.No_Auto_Pruebas
                    ,p.Fecha_Auto_Pruebas
                    ,p.Fecha_Comunicacion_Auto_Pruebas
                    ,p.No_Auto_Traslado
                    ,p.Fecha_Auto_Traslado
                    ,p.Fecha_Comunicacion_Auto_Traslado
                    ,p.Fecha_Terminos_Alegatos
                    ,p.No_Radicado_Alegatos
                    ,p.Fecha_Radicado_Alegatos
                FROM Pruebas as p
                    INNER JOIN Expediente ON Expediente.Id = p.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarPruebas(data){
         const pool = await getConnection();
            const query = `
                UPDATE Pruebas
                SET
                    No_Auto_Pruebas = @No_Auto_Pruebas
                    ,Fecha_Auto_Pruebas = @Fecha_Auto_Pruebas
                    ,Fecha_Comunicacion_Auto_Pruebas = @Fecha_Comunicacion_Auto_Pruebas
                    ,No_Auto_Traslado = @No_Auto_Traslado
                    ,Fecha_Auto_Traslado = @Fecha_Auto_Traslado
                    ,Fecha_Comunicacion_Auto_Traslado = @Fecha_Comunicacion_Auto_Traslado
                    ,Fecha_Terminos_Alegatos = @Fecha_Terminos_Alegatos
                    ,No_Radicado_Alegatos = @No_Radicado_Alegatos
                    ,Fecha_Radicado_Alegatos = @Fecha_Radicado_Alegatos
                    ,Usuario_Id = @Usuario_Id
                    ,Ultima_Modificacion = @Ultima_Modificacion
                WHERE Expediente_Id = @Expediente_Id`;

            const result = await pool.request()
                .input('Expediente_Id', sql.Int, data.Expediente_Id)
                .input('No_Auto_Pruebas', sql.NVarChar, data.No_Auto_Pruebas)
                .input('Fecha_Auto_Pruebas', sql.DateTime, data.Fecha_Auto_Pruebas)
                .input('Fecha_Comunicacion_Auto_Pruebas', sql.DateTime, data.Fecha_Comunicacion_Auto_Pruebas)
                .input('No_Auto_Traslado', sql.NVarChar, data.No_Auto_Traslado)
                .input('Fecha_Auto_Traslado', sql.DateTime, data.Fecha_Auto_Traslado)
                .input('Fecha_Comunicacion_Auto_Traslado', sql.DateTime, data.Fecha_Comunicacion_Auto_Traslado)
                .input('Fecha_Terminos_Alegatos', sql.DateTime, data.Fecha_Terminos_Alegatos)
                .input('No_Radicado_Alegatos', sql.NVarChar, data.No_Radicado_Alegatos)
                .input('Fecha_Radicado_Alegatos', sql.DateTime, data.Fecha_Radicado_Alegatos)
                .input('Usuario_Id', sql.Int, data.Usuario_Id)
                .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
                .query(query);

            return result.rowsAffected[0] === 1;
    }

    static async buscarAceptacionCargos(expediente){
        const pool = await getConnection();
        const query = `
                SELECT ac.Numero_Radicado
                    ,ac.Fecha_Radicado
                FROM Aceptacion_Cargos as ac
                    INNER JOIN Expediente ON Expediente.Id = ac.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarAceptacionCargos(data){
        const pool = await getConnection();
        const query = `
            UPDATE Aceptacion_Cargos
            SET
                Numero_Radicado = @Numero_Radicado
                ,Fecha_Radicado = @Fecha_Radicado
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Numero_Radicado', sql.NVarChar, data.Numero_Radicado)
            .input('Fecha_Radicado', sql.DateTime, data.Fecha_Radicado)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async getSentidoFallo() {
            
            const pool = await getConnection();
            const query = 'SELECT Id, Descripcion FROM Sentido_Fallo';
            const result = await pool.query(query);
            return result.recordset;
    }

    static async buscarFallo(expediente){
        const pool = await getConnection();
        const query = `
                SELECT f.Numero_Resolucion
                    ,f.Fecha_Resolucion
                    ,f.Sentido_Fallo_Id
                    ,f.Valor_Sancion
                    ,f.Fecha_Notificacion
                    ,f.Fecha_Max_Para_Recursos
                    ,f.Numero_Radicado_Contra_Fallo
                    ,f.Fecha_Radicado_Contra_Fallo
                FROM Fallo as f
                    INNER JOIN Expediente ON Expediente.Id = f.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarFallo(data){
        const pool = await getConnection();

        const query = `
            UPDATE Fallo
            SET
                Numero_Resolucion = @Numero_Resolucion
                ,Fecha_Resolucion = @Fecha_Resolucion
                ,Sentido_Fallo_Id = @Sentido_Fallo_Id
                ,Valor_Sancion = @Valor_Sancion
                ,Fecha_Notificacion = @Fecha_Notificacion
                ,Fecha_Max_Para_Recursos = @Fecha_Max_Para_Recursos
                ,Numero_Radicado_Contra_Fallo = @Numero_Radicado_Contra_Fallo
                ,Fecha_Radicado_Contra_Fallo = @Fecha_Radicado_Contra_Fallo
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Numero_Resolucion', sql.NVarChar, data.Numero_Resolucion)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Sentido_Fallo_Id', sql.Int, data.Sentido_Fallo_Id)
            .input('Valor_Sancion', sql.Int, data.Valor_Sancion)
            .input('Fecha_Notificacion', sql.DateTime, data.Fecha_Notificacion)
            .input('Fecha_Max_Para_Recursos', sql.DateTime, data.Fecha_Max_Para_Recursos)
            .input('Numero_Radicado_Contra_Fallo', sql.NVarChar, data.Numero_Radicado_Contra_Fallo)
            .input('Fecha_Radicado_Contra_Fallo', sql.DateTime, data.Fecha_Radicado_Contra_Fallo)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async getDecision(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Decision';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async getTipoRecurso(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Tipo_Recurso';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async buscarRecursoPrimeraInstancia(expediente){
        const pool = await getConnection();
        const query = `
                SELECT rp.Tipo_Recurso_Id
                    ,rp.No_Resolucion_Recurso
                    ,rp.Fecha_Resolucion
                    ,rp.Fecha_Notificacion
                    ,rp.Decision_Id
                    ,rp.Valor_Sancion_Modificado
                FROM Recurso_Primera_Instancia as rp
                    INNER JOIN Expediente ON Expediente.Id = rp.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarRecursoPrimeraInstancia(data){
        const pool = await getConnection();

        const query = `
            UPDATE Recurso_Primera_Instancia
            SET
                Tipo_Recurso_Id = @Tipo_Recurso_Id
                ,No_Resolucion_Recurso = @No_Resolucion_Recurso
                ,Fecha_Resolucion = @Fecha_Resolucion
                ,Fecha_Notificacion = @Fecha_Notificacion
                ,Decision_Id = @Decision_Id
                ,Valor_Sancion_Modificado = @Valor_Sancion_Modificado
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Tipo_Recurso_Id', sql.Int, data.Tipo_Recurso_Id)
            .input('No_Resolucion_Recurso', sql.NVarChar, data.No_Resolucion_Recurso)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Fecha_Notificacion', sql.DateTime, data.Fecha_Notificacion)
            .input('Decision_Id', sql.Int, data.Decision_Id)
            .input('Valor_Sancion_Modificado', sql.Int, data.Valor_Sancion_Modificado)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async getDecisionSegundaInstancia(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Decision_Seg_Instatancia';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async buscarRecursoSegundaInstancia(expediente){
        const pool = await getConnection();
        const query = `
                SELECT rs.Fecha_Envio_Segunda_Inst
                    ,rs.No_Memorando_Envio
                    ,rs.No_Resolucion_Recurso_Apelacion
                    ,rs.Fecha_Resolucion_Rec_Apel
                    ,rs.Fecha_Notificacion_Resolucion_Rec_Apel
                    ,rs.Decision_Seg_Instatancia_Id
                    ,rs.Fecha_Devolucion
                    ,rs.Valor_Sancion_Modificado
                    ,rs.No_Resol_Silencio_Administrativo
                FROM Recurso_Segunda_Instancia as rs
                    INNER JOIN Expediente ON Expediente.Id = rs.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarRecursoSegundaInstancia(data){
        const pool = await getConnection();

        const query = `
            UPDATE Recurso_Segunda_Instancia
            SET
                Fecha_Envio_Segunda_Inst = @Fecha_Envio_Segunda_Inst
                ,No_Memorando_Envio = @No_Memorando_Envio
                ,No_Resolucion_Recurso_Apelacion = @No_Resolucion_Recurso_Apelacion
                ,Fecha_Resolucion_Rec_Apel = @Fecha_Resolucion_Rec_Apel
                ,Fecha_Notificacion_Resolucion_Rec_Apel = @Fecha_Notificacion_Resolucion_Rec_Apel
                ,Decision_Seg_Instatancia_Id = @Decision_Seg_Instatancia_Id
                ,Fecha_Devolucion = @Fecha_Devolucion
                ,Valor_Sancion_Modificado = @Valor_Sancion_Modificado
                ,No_Resol_Silencio_Administrativo = @No_Resol_Silencio_Administrativo
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Fecha_Envio_Segunda_Inst', sql.DateTime, data.Fecha_Envio_Segunda_Inst)
            .input('No_Memorando_Envio', sql.NVarChar, data.No_Memorando_Envio)
            .input('No_Resolucion_Recurso_Apelacion', sql.NVarChar, data.No_Resolucion_Recurso_Apelacion)
            .input('Fecha_Resolucion_Rec_Apel', sql.DateTime, data.Fecha_Resolucion_Rec_Apel)
            .input('Fecha_Notificacion_Resolucion_Rec_Apel', sql.DateTime, data.Fecha_Notificacion_Resolucion_Rec_Apel)
            .input('Decision_Seg_Instatancia_Id', sql.Int, data.Decision_Seg_Instatancia_Id)
            .input('Fecha_Devolucion', sql.DateTime, data.Fecha_Devolucion)
            .input('Valor_Sancion_Modificado', sql.Int, data.Valor_Sancion_Modificado)
            .input('No_Resol_Silencio_Administrativo', sql.NVarChar, data.No_Resol_Silencio_Administrativo)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async getRecQuejaRevocatoria(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Recurso_Queja_Revoc';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async getDecisionQuejaRevocatoria(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Decision_Queja_Revoc';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async buscarRecQuejaRevocatoria(expediente){
        const pool = await getConnection();
        const query = `
                SELECT rq.Recurso_Queja_Revoc_Id
                    ,rq.No_Radicado
                    ,rq.Fecha_Radicado
                    ,rq.No_Resolucion
                    ,rq.Fecha_Resolucion
                    ,rq.Fecha_Notificacion
                    ,rq.Decision_Queja_Revoc_Id
                FROM Recurso_Queja_Revoc_Directa as rq
                    INNER JOIN Expediente ON Expediente.Id = rq.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarRecQuejaRevocatoria(data){
        const pool = await getConnection();

        const query = `
            UPDATE Recurso_Queja_Revoc_Directa
            SET
                Recurso_Queja_Revoc_Id = @Recurso_Queja_Revoc_Id
                ,No_Radicado = @No_Radicado
                ,Fecha_Radicado = @Fecha_Radicado
                ,No_Resolucion = @No_Resolucion
                ,Fecha_Resolucion = @Fecha_Resolucion
                ,Fecha_Notificacion = @Fecha_Notificacion
                ,Decision_Queja_Revoc_Id = @Decision_Queja_Revoc_Id
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Recurso_Queja_Revoc_Id', sql.Int, data.Recurso_Queja_Revoc_Id)
            .input('No_Radicado', sql.NVarChar, data.No_Radicado)
            .input('Fecha_Radicado', sql.DateTime, data.Fecha_Radicado)
            .input('No_Resolucion', sql.NVarChar, data.No_Resolucion)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Fecha_Notificacion', sql.DateTime, data.Fecha_Notificacion)
            .input('Decision_Queja_Revoc_Id', sql.Int, data.Decision_Queja_Revoc_Id)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarEjecutoria(expediente){
        const pool = await getConnection();
        const query = `
                SELECT e.Fecha_Ejecutoria
                FROM Ejecutoria as e
                    INNER JOIN Expediente ON Expediente.Id = e.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarEjecutoria(data){
        const pool = await getConnection();

        const query = `
            UPDATE Ejecutoria
            SET
                Fecha_Ejecutoria = @Fecha_Ejecutoria
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Fecha_Ejecutoria', sql.DateTime, data.Fecha_Ejecutoria)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarGestionCobro(expediente){
        const pool = await getConnection();
        const query = `
                SELECT gc.Fecha_Envio
                FROM Gestion_Cobro as gc
                    INNER JOIN Expediente ON Expediente.Id = gc.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarGestionCobro(data){
        const pool = await getConnection();

        const query = `
            UPDATE Gestion_Cobro
            SET
                Fecha_Envio = @Fecha_Envio
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Fecha_Envio', sql.DateTime, data.Fecha_Envio)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async getTipoResolucion(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Tipo_Resolucion';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async buscarAjusteDerAclaratorio(expediente){
        const pool = await getConnection();
        const query = `
                SELECT ada.Tipo_Resolucion_Id
                    ,ada.No_Resolucion
                    ,ada.Fecha_Resolucion
                    ,ada.Fecha_Fecha_Notificacion
                FROM Ajuste_Derec_Aclarat as ada
                    INNER JOIN Expediente ON Expediente.Id = ada.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarAjusteDerAclaratorio(data){
        const pool = await getConnection();

        const query = `
            UPDATE Ajuste_Derec_Aclarat
            SET
                Tipo_Resolucion_Id = @Tipo_Resolucion_Id
                ,No_Resolucion = @No_Resolucion
                ,Fecha_Resolucion = @Fecha_Resolucion
                ,Fecha_Fecha_Notificacion = @Fecha_Fecha_Notificacion
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Tipo_Resolucion_Id', sql.Int, data.Tipo_Resolucion_Id)
            .input('No_Resolucion', sql.NVarChar, data.No_Resolucion)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Fecha_Fecha_Notificacion', sql.DateTime, data.Fecha_Fecha_Notificacion)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarEstado(expediente){
        const pool = await getConnection();
        const query = `
                SELECT e.Descripcion
                FROM Estado as e
                    INNER JOIN Expediente ON Expediente.Id = e.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarEstado(data){
        const pool = await getConnection();

        const query = `
            UPDATE Estado
            SET
                Descripcion = @Descripcion
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Descripcion', sql.NVarChar, data.Descripcion)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarAsignacion(expediente){
        const pool = await getConnection();
        const query = `
                SELECT a.Nombre_Abogado
                    ,a.Fecha_Asignacion
                FROM Asignacion as a
                    INNER JOIN Expediente ON Expediente.Id = a.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarAsignacion(data){
        const pool = await getConnection();

        const query = `
            UPDATE Asignacion
            SET
                Nombre_Abogado = @Nombre_Abogado
                ,Fecha_Asignacion = @Fecha_Asignacion
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Nombre_Abogado', sql.NVarChar, data.Nombre_Abogado)
            .input('Fecha_Asignacion', sql.DateTime, data.Fecha_Asignacion)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }





}