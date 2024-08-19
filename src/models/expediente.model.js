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

     static async getTipoEstado() {
            
            const pool = await getConnection();
            const query = 'SELECT Id, Descripcion FROM Tipo_Estado';
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
            await this.agregarPagoValor(datos);
            await this.aregarUbicacionExpediente(datos);
            await this.agregarEstadoFinal(datos);
            await this.agregarSolicitudesEspeciales(datos);

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

     static async agregarPagoValor(datos){
            const pool = await getConnection();
            const query = `
                INSERT INTO Pago_Valor
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

     static async aregarUbicacionExpediente(datos){
            const pool = await getConnection();
            const query = `
                INSERT INTO Ubicacion_Expediente
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

     static async agregarEstadoFinal(datos){
            const pool = await getConnection();
            const query = `
                INSERT INTO Estado_Final
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

     static async agregarSolicitudesEspeciales(datos){
            const pool = await getConnection();
            const query = `
                INSERT INTO Solicitudes_Especiales
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
            const query = `SELECT *
                    FROM Expediente as e
                    WHERE Numero_Expediente = @expediente`;
            const result = await pool.request()
                .input('expediente', sql.NVarChar, expediente)
                .query(query);
      
            return result.recordset[0];
     }

     static async getExpediente(expediente){
            const pool = await getConnection();
            const query = `SELECT *,
                        mi.Descripcion as Motivo_Investigacion,
                        ci.Descripcion as Clase_Infraccion,
                        ms.Descripcion as Modalidad_Servicio,
                        ts.Descripcion as Tipo_Servicio,
                        ss.Descripcion as Sujeto_Sancionable,
                        tpn.Descripcion as Tipo_Persona_Natural,
                        a.Numero_Resolucion as Numero_Resolucion_Apertura,
                        a.Fecha_Resolucion as Fecha_Resolucion_Apertura,
                        i.Numero_Resolucion as Numero_Resolucion_Inhibitorio,
                        i.Fecha_Comunicacion as Fecha_Comunicacion_Inhibitorio,
                        i.Fecha_Resolucion as Fecha_Resolucion_Inhibitorio,
                        a.Fecha_Radicado as Fecha_Radicado_Apertura,
                        a.Fecha_Notificacion as Fecha_Notificacion_Apertura,
                        ac.Numero_Radicado as Numero_Radicado_Aceptacion_Cargos,
                        ac.Fecha_Radicado as Fecha_Radicado_Aceptacion_Cargos,
                        f.Numero_Resolucion as Numero_Resolucion_Fallo,
                        f.Fecha_Resolucion as Fecha_Resolucion_Fallo,
                        sf.Descripcion as Sentido_Fallo,
                        f.Valor_Sancion as Valor_Sancion_Fallo,
                        f.Fecha_Notificacion as Fecha_Notificacion_Fallo,
                        f.Fecha_Max_Para_Recursos as Fecha_Max_Para_Recursos_Fallo,
                        f.Numero_Radicado_Contra_Fallo as Numero_Radicado_Contra_Fallo_Fallo,
                        f.Fecha_Radicado_Contra_Fallo as Fecha_Radicado_Contra_Fallo_Fallo,
                        tr.Descripcion as Tipo_Recurso_Primera_Instancia,
                        rpi.No_Resolucion_Recurso as No_Resolucion_Recurso_Primera_Instancia,
                        rpi.Fecha_Resolucion as Fecha_Resolucion_Recurso_Primera_Instancia,
                        rpi.Fecha_Notificacion as Fecha_Notificacion_Recurso_Primera_Instancia,
                        d.Descripcion as Decision_Recurso_Primera_Instancia,
                        rpi.Valor_Sancion_Modificado as Valor_Sancion_Modificado_Recurso_Primera_Instancia,
                        rsi.Fecha_Envio_Segunda_Inst as Fecha_Envio_Segunda_Instancia,
                        rsi.No_Memorando_Envio as No_Memorando_Envio_Segunda_Instancia,
                        rsi.No_Resolucion_Recurso_Apelacion as No_Resolucion_Recurso_Apelacion_Segunda_Instancia,
                        rsi.Fecha_Resolucion_Rec_Apel as Fecha_Resolucion_Rec_Apel_Segunda_Instancia,
                        rsi.Fecha_Notificacion_Resolucion_Rec_Apel as Fecha_Notificacion_Resolucion_Rec_Apel_Segunda_Instancia,
                        dsi.Descripcion as Decision_Segunda_Instancia,
                        rsi.Fecha_Devolucion as Fecha_Devolucion_Segunda_Instancia,
                        rsi.Valor_Sancion_Modificado as Valor_Sancion_Modificado_Segunda_Instancia,
                        rsi.No_Resol_Silencio_Administrativo as No_Resol_Silencio_Administrativo_Segunda_Instancia,
                        rqr.Descripcion as Recurso_Queja_Revocatoria,
                        rrd.No_Radicado as No_Radicado_Rec_Queja_Revocatoria,
                        rrd.Fecha_Radicado as Fecha_Radicado_Rec_Queja_Revocatoria,
                        rrd.No_Resolucion as No_Resolucion_Rec_Queja_Revocatoria,
                        rrd.Fecha_Resolucion as Fecha_Resolucion_Rec_Queja_Revocatoria,
                        rrd.Fecha_Notificacion as Fecha_Notificacion_Rec_Queja_Revocatoria,
                        dqr.Descripcion as Decision_Rec_Queja_Revocatoria,
                        gc.Fecha_Envio as Fecha_Envio_Gestion_Cobro,
                        trada.Descripcion as Tipo_Resolucion_Ajuste_Derecho_Aclaratorio,
                        ada.No_Resolucion as No_Resolucion_Ajuste_Derecho_Aclaratorio,
                        ada.Fecha_Resolucion as Fecha_Resolucion_Ajuste_Derecho_Aclaratorio,
                        ada.Fecha_Fecha_Notificacion as Fecha_Notificacion_Ajuste_Derecho_Aclaratorio,
                        tes.Descripcion as Tipo_Estado,
                        asig.Fecha_Asignacion as Fecha_Asignacion_Asignacion
                    FROM Expediente as e
                    LEFT JOIN Motivo_Investigacion as mi ON mi.Id = e.Motivo_Investigacion_Id
                    LEFT JOIN Clase_Infraccion as ci ON ci.Id = e.Clase_Infraccion_Id
                    LEFT JOIN Modalidad_Servicio as ms ON ms.Id = e.Modalidad_Servicio_Id
                    LEFT JOIN Tipo_Servicio as ts ON ts.Id = e.Tipo_Servicio_Id
                    LEFT JOIN Sujeto_Sancionable as ss ON ss.Id = e.Sujeto_Sancionable_Id
                    LEFT JOIN Tipo_Persona_Natural as tpn ON tpn.Id = e.Tipo_Persona_Natural_Id
                    INNER JOIN Apertura as a ON a.Expediente_Id = e.Id
                    INNER JOIN Inhibitorio as i ON i.Expediente_Id = e.Id
                    INNER JOIN Pruebas as p ON p.Expediente_Id = e.Id
                    INNER JOIN Aceptacion_Cargos as ac ON ac.Expediente_Id = e.Id
                    INNER JOIN Fallo as f ON f.Expediente_Id = e.Id
                    LEFT JOIN Sentido_Fallo as sf ON sf.Id = f.Sentido_Fallo_Id
                    INNER JOIN Recurso_Primera_Instancia as rpi ON rpi.Expediente_Id = e.Id
                    LEFT JOIN Tipo_Recurso as tr ON tr.Id = rpi.Tipo_Recurso_Id
                    LEFT JOIN Decision as d ON d.Id = rpi.Decision_Id
                    INNER JOIN Recurso_Segunda_Instancia as rsi ON rsi.Expediente_Id = e.Id
                    LEFT JOIN Decision_Seg_Instatancia as dsi ON dsi.Id = rsi.Decision_Seg_Instatancia_Id
                    INNER JOIN Recurso_Queja_Revoc_Directa as rrd ON rrd.Expediente_Id = e.Id
                    LEFT JOIN Recurso_Queja_Revoc as rqr ON rqr.Id = rrd.Recurso_Queja_Revoc_Id
                    LEFT JOIN Decision_Queja_Revoc as dqr ON dqr.Id = rrd.Decision_Queja_Revoc_Id
                    INNER JOIN Ejecutoria as ej ON ej.Expediente_Id = e.Id
                    INNER JOIN Gestion_Cobro as gc ON gc.Expediente_Id = e.Id
                    INNER JOIN Ajuste_Derec_Aclarat as ada ON ada.Expediente_Id = e.Id
                    LEFT JOIN Tipo_Resolucion as trada ON tr.Id = ada.Tipo_Resolucion_Id
                    INNER JOIN Estado as es ON es.Expediente_Id = e.Id
                    LEFT JOIN Tipo_Estado as tes ON tes.Id = es.Tipo_Estado_Id
                    INNER JOIN Asignacion as asig ON asig.Expediente_Id = e.Id
                    LEFT JOIN Abogado as ab ON ab.Id = asig.Nombre_Abogado_Id
                    WHERE Numero_Expediente = @expediente;
`;
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
                .input('Motivo_Investigacion_Id', sql.Int, data.Motivo_Investigacion_Id || null)
                .input('Numero_Informe_Infraccion', sql.Int, data.Numero_Informe_Infraccion)
                .input('Fecha_Hechos', sql.DateTime, data.Fecha_Hechos)
                .input('Fecha_Caducidad', sql.DateTime, data.Fecha_Caducidad)
                .input('Placa', sql.NVarChar, data.Placa)
                .input('Clase_Infraccion_Id', sql.Int, data.Clase_Infraccion_Id || null)
                .input('Modalidad_Servicio_Id', sql.Int, data.Modalidad_Servicio_Id || null)
                .input('Tipo_Servicio_Id', sql.Int, data.Tipo_Servicio_Id || null)
                .input('Sujeto_Sancionable_Id', sql.Int, data.Sujeto_Sancionable_Id || null)
                .input('Tipo_Persona_Natural_Id', sql.Int, data.Tipo_Persona_Natural_Id || null)
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
            .input('Sentido_Fallo_Id', sql.Int, data.Sentido_Fallo_Id || null)
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
            .input('Tipo_Recurso_Id', sql.Int, data.Tipo_Recurso_Id || null)
            .input('No_Resolucion_Recurso', sql.NVarChar, data.No_Resolucion_Recurso)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Fecha_Notificacion', sql.DateTime, data.Fecha_Notificacion)
            .input('Decision_Id', sql.Int, data.Decision_Id || null)
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
            .input('Decision_Seg_Instatancia_Id', sql.Int, data.Decision_Seg_Instatancia_Id || null)
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
            .input('Recurso_Queja_Revoc_Id', sql.Int, data.Recurso_Queja_Revoc_Id || null)
            .input('No_Radicado', sql.NVarChar, data.No_Radicado)
            .input('Fecha_Radicado', sql.DateTime, data.Fecha_Radicado)
            .input('No_Resolucion', sql.NVarChar, data.No_Resolucion)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Fecha_Notificacion', sql.DateTime, data.Fecha_Notificacion)
            .input('Decision_Queja_Revoc_Id', sql.Int, data.Decision_Queja_Revoc_Id || null)
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
            .input('Tipo_Resolucion_Id', sql.Int, data.Tipo_Resolucion_Id || null)
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
                SELECT Tipo_Estado_Id
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
                Tipo_Estado_Id = @Tipo_Estado_Id
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Tipo_Estado_Id', sql.Int, data.Tipo_Estado_Id)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async getNombreAbogado(){
        const pool = await getConnection();
        const query = 'SELECT Id, Nombre_Abogado FROM Abogado';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async buscarAsignacion(expediente){
        const pool = await getConnection();
        const query = `
                SELECT a.Nombre_Abogado_Id
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
                Nombre_Abogado_Id = @Nombre_Abogado_Id
                ,Fecha_Asignacion = @Fecha_Asignacion
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Nombre_Abogado_Id', sql.Int, data.Nombre_Abogado_Id)
            .input('Fecha_Asignacion', sql.DateTime, data.Fecha_Asignacion)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarAutoAcumulacion(expediente){
        const pool = await getConnection();
        const query = `
                SELECT aa.Numero_Exp_Acumulado,
                aa.Numero_Resolucion,
                aa.Fecha_Resolucion,
                aa.Fecha_Comunicacion
                FROM Auto_Acumulacion as aa
                    INNER JOIN Expediente ON Expediente.Id = aa.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarAutoAcumulacion(data){
        const pool = await getConnection();

        const query = `
            UPDATE Auto_Acumulacion
            SET
                Numero_Exp_Acumulado = @Numero_Exp_Acumulado
                ,Numero_Resolucion = @Numero_Resolucion
                ,Fecha_Resolucion = @Fecha_Resolucion
                ,Fecha_Comunicacion = @Fecha_Comunicacion
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Numero_Exp_Acumulado', sql.NVarChar, data.Numero_Exp_Acumulado)
            .input('Numero_Resolucion', sql.NVarChar, data.Numero_Resolucion)
            .input('Fecha_Resolucion', sql.DateTime, data.Fecha_Resolucion)
            .input('Fecha_Comunicacion', sql.DateTime, data.Fecha_Comunicacion)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarPagoValor(expediente){
        const pool = await getConnection();
        const query = `
                SELECT pv.Recibo_Pago,
                pv.Valor
                FROM Pago_Valor as pv
                    INNER JOIN Expediente ON Expediente.Id = pv.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarPagoValor(data){
        const pool = await getConnection();

        const query = `
            UPDATE Pago_Valor
            SET
                Recibo_Pago = @Recibo_Pago
                ,Valor = @Valor
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Recibo_Pago', sql.NVarChar, data.Recibo_Pago)
            .input('Valor', sql.Int, data.Valor)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    static async buscarSolicitudesEspeciales(expediente){
        const pool = await getConnection();
        const query = `
                SELECT se.Descripcion
                FROM Solicitudes_Especiales as se
                    INNER JOIN Expediente ON Expediente.Id = se.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarSolicitudesEspeciales(data){
        const pool = await getConnection();

        const query = `
            UPDATE Solicitudes_Especiales
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

    static async getTipoUbicacion(){
        const pool = await getConnection();
        const query = 'SELECT Id, Descripcion FROM Tipo_Ubicacion';
        const result = await pool.query(query);
        return result.recordset;
    }

    static async buscarUbicacionExpediente(expediente){
        const pool = await getConnection();
        const query = `
                SELECT ue.Tipo_Ubicacion_Id
                    ,ue.Fecha_Entrega
                FROM Ubicacion_Expediente as ue
                    INNER JOIN Expediente ON Expediente.Id = ue.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarUbicacionExpediente(data){
        const pool = await getConnection();

        const query = `
            UPDATE Ubicacion_Expediente
            SET
                Tipo_Ubicacion_Id = @Tipo_Ubicacion_Id
                ,Fecha_Entrega = @Fecha_Entrega
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Tipo_Ubicacion_Id', sql.Int, data.Tipo_Ubicacion_Id)
            .input('Fecha_Entrega', sql.DateTime, data.Fecha_Entrega)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }

    
     static async getTipoEstadoFinal() {
            
            const pool = await getConnection();
            const query = 'SELECT Id, Descripcion FROM Tipo_Estado_Final';
            const result = await pool.query(query);
            return result.recordset;
     }

     static async buscarEstadoFinal(expediente){
        const pool = await getConnection();
        const query = `
                SELECT Tipo_Estado_Final_Id
                FROM Estado_Final as e
                    INNER JOIN Expediente ON Expediente.Id = e.Expediente_Id
                    WHERE Expediente.Numero_Expediente = @expediente`;
        const result = await pool.request()
            .input('expediente', sql.NVarChar, expediente)
            .query(query);
    
        return result.recordset[0];
    }

    static async actualizarEstadoFinal(data){
        const pool = await getConnection();

        const query = `
            UPDATE Estado_Final
            SET
                Tipo_Estado_Final_Id = @Tipo_Estado_Final_Id
                ,Usuario_Id = @Usuario_Id
                ,Ultima_Modificacion = @Ultima_Modificacion
            WHERE Expediente_Id = @Expediente_Id`;

        const result = await pool.request()
            .input('Expediente_Id', sql.Int, data.Expediente_Id)
            .input('Tipo_Estado_Final_Id', sql.Int, data.Tipo_Estado_Final_Id)
            .input('Usuario_Id', sql.Int, data.Usuario_Id)
            .input('Ultima_Modificacion', sql.DateTime, data.Ultima_Modificacion)
            .query(query);

        return result.rowsAffected[0] === 1;
    }





}