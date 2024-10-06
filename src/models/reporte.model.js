import { getConnection, mssql as sql } from "../config/conexion.js";
import { ExpedienteModel } from "./expediente.model.js";

export class ReporteModel {
  static async tieneCamposNulos(obj) {
    for (const key in obj) {
      if (obj[key] === null) {
        return true; // Si encuentra un campo nulo, retorna true
      }
    }
    return false; // Si no encuentra ningún campo nulo, retorna false
  }

  static async getReporte(expediente) {
    try {
      const expedienteData = await ExpedienteModel.buscarExpediente(expediente);
      if (!expedienteData) {
        return null;
      }
      return this.tieneCamposNulos(expedienteData);
    } catch (error) {
      console.error("este es el error: ", error);
      return null;
    }
  }

  static async verificarPlaca(placa) {
    const pool = await getConnection();
    const query = `SELECT e.Numero_Expediente, e.Placa, e.Nombre_Persona_Natural, ss.Descripcion as Sujeto_Sancionable 
                    FROM Expediente as e
                    LEFT JOIN Sujeto_Sancionable as ss ON e.Sujeto_Sancionable_Id = ss.Id
                    WHERE Placa = @placa`;
    const result = await pool
      .request()
      .input("placa", sql.NVarChar, placa)
      .query(query);

      if(result.recordset.length === 0){
        return {success: null, message: "No se encontró la placa.", estado: "No encontrado"};
      }
    const expediente = result.recordset[0].Numero_Expediente;
    const expedienteData = await ExpedienteModel.buscarExpediente(expediente);

    if (!expedienteData) {
      return result.recordset[0];
    }
     const reporteExpediente = await this.tieneCamposNulos(expedienteData);
     if (reporteExpediente === true) {
          return {success: false, message: "El expediente se encuentra en estado Expediente",expediente, estado: "Expediente"};
     }

     const Apertura = await ExpedienteModel.buscarApertura(expediente);
     if (!Apertura) {
        return result.recordset[0];
     }
     const reporteApertura = await this.tieneCamposNulos(Apertura);
     if (reporteApertura === true) {
        return {success: false, message: "El expediente se encuentra en estado Apertura",expediente, estado: "Apertura"};
     }

     const Inhibitorio = await ExpedienteModel.buscarInhibitorio(expediente);
     if (!Inhibitorio) {
        return result.recordset[0];
     }
     const reporteInhibitorio = await this.tieneCamposNulos(Inhibitorio);
     if (reporteInhibitorio === true) {
        return {success: false, message: "El expediente se encuentra en estado Inhibitorio",expediente, estado: "Inhibitorio"};
     }
     
     const Auto_Acumulacion = await ExpedienteModel.buscarAutoAcumulacion(expediente);
     if (!Auto_Acumulacion) {
        return result.recordset[0];
     }
     const reporteAuto_Acumulacion = await this.tieneCamposNulos(Auto_Acumulacion);
     if (reporteAuto_Acumulacion === true) {
        return {success: false, message: "El expediente se encuentra en estado Auto Acumulacion",expediente, estado: "Auto Acumulacion"};
     }

     const Pruebas = await ExpedienteModel.buscarPruebas(expediente);
     if (!Pruebas) {
        return result.recordset[0];
     }
     const reportePruebas = await this.tieneCamposNulos(Pruebas);
     if (reportePruebas === true) {
        return {success: false, message: "El expediente se encuentra en estado Pruebas",expediente, estado: "Pruebas"};
     }

     const Aceptacion_Cargos = await ExpedienteModel.buscarAceptacionCargos(expediente);
     if (!Aceptacion_Cargos) {
        return result.recordset[0];
     }
     const reporteAceptacion_Cargos = await this.tieneCamposNulos(Aceptacion_Cargos);
     if (reporteAceptacion_Cargos === true) {
        return {success: false, message: "El expediente se encuentra en estado Aceptacion Cargos",expediente, estado: "Aceptacion Cargos"};
     }

     const Fallo = await ExpedienteModel.buscarFallo(expediente);
     if (!Fallo) {
        return result.recordset[0];
     }
     const reporteFallo = await this.tieneCamposNulos(Fallo);
     if (reporteFallo === true) {
        return {success: false, message: "El expediente se encuentra en estado Fallo",expediente, estado: "Fallo"};
     }

     const Recurso_Primera_Instancia = await ExpedienteModel.buscarRecursoPrimeraInstancia(expediente);
     if (!Recurso_Primera_Instancia) {
        return result.recordset[0];
     }
     const reporteRecurso_Primera_Instancia = await this.tieneCamposNulos(Recurso_Primera_Instancia);
     if (reporteRecurso_Primera_Instancia === true) {
        return {success: false, message: "El expediente se encuentra en estado Recurso Primera Instancia",expediente, estado: "Recurso Primera Instancia"};
     }

     const Recurso_Segunda_Instancia = await ExpedienteModel.buscarRecursoSegundaInstancia(expediente);
     if (!Recurso_Segunda_Instancia) {
        return result.recordset[0];
     }
     const reporteRecurso_Segunda_Instancia = await this.tieneCamposNulos(Recurso_Segunda_Instancia);
     if (reporteRecurso_Segunda_Instancia === true) {
        return {success: false, message: "El expediente se encuentra en estado Recurso Segunda Instancia",expediente, estado: "Recurso Segunda Instancia"};
     }

     const Rec_Queja_Revocatoria = await ExpedienteModel.buscarRecQuejaRevocatoria(expediente);
     if (!Rec_Queja_Revocatoria) {
        return result.recordset[0];
     }
     const reporteRec_Queja_Revocatoria = await this.tieneCamposNulos(Rec_Queja_Revocatoria);
     if (reporteRec_Queja_Revocatoria === true) {
        return {success: false, message: "El expediente se encuentra en estado Rec Queja Revocatoria",expediente, estado: "Rec Queja Revocatoria"};
     }

     const Ejecutoria = await ExpedienteModel.buscarEjecutoria(expediente);
     if (!Ejecutoria) {
        return result.recordset[0];
     }
     const reporteEjecutoria = await this.tieneCamposNulos(Ejecutoria);
     if (reporteEjecutoria === true) {
        return {success: false, message: "El expediente se encuentra en estado Ejecutoria",expediente, estado: "Ejecutoria"};
     }

     const Gestion_Cobro = await ExpedienteModel.buscarGestionCobro(expediente);
     if (!Gestion_Cobro) {
        return result.recordset[0];
     }
     const reporteGestion_Cobro = await this.tieneCamposNulos(Gestion_Cobro);
     if (reporteGestion_Cobro === true) {
        return {success: false, message: "El expediente se encuentra en estado Gestion Cobro",expediente, estado: "Gestion Cobro"};
     }

     const Ajuste_Derecho_Aclaratorio = await ExpedienteModel.buscarAjusteDerAclaratorio(expediente);
     if (!Ajuste_Derecho_Aclaratorio) {
        return result.recordset[0];
     }
     const reporteAjuste_Derecho_Aclaratorio = await this.tieneCamposNulos(Ajuste_Derecho_Aclaratorio);
     if (reporteAjuste_Derecho_Aclaratorio === true) {
        return {success: false, message: "El expediente se encuentra en estado Ajuste Derecho Aclaratorio",expediente, estado: "Ajuste Derecho Aclaratorio"};
     }

     const Estado = await ExpedienteModel.buscarEstado(expediente);
     if (!Estado) {
        return result.recordset[0];
     }
     const {estadoFind} = await ExpedienteModel.getEstadoById(Estado.Tipo_Estado_Id);
     console.log("res:",estadoFind);
     const reporteEstado = await this.tieneCamposNulos(Estado);
     if (reporteEstado === true) {
        return {success: false, message: "El expediente se encuentra en estado Estado",expediente, estado: "Estado"};
     }

     const Asignacion = await ExpedienteModel.buscarAsignacion(expediente);
     if (!Asignacion) {
        return result.recordset[0];
     }
     const reporteAsignacion = await this.tieneCamposNulos(Asignacion);
     if (reporteAsignacion === true) {
        return {success: false, message: "El expediente se encuentra en estado Asignacion",expediente, estado: "Asignacion"};
     }

     
     const Pago_Valor = await ExpedienteModel.buscarPagoValor(expediente);
     if (!Pago_Valor) {
        return result.recordset[0];
     }
     const reportePago_Valor = await this.tieneCamposNulos(Pago_Valor);
     if (reportePago_Valor === true) {
        return {success: false, message: "El expediente se encuentra en estado Pago Valor",expediente, estado: "Pago Valor"};
     }

     const Solicitudes_Especiales = await ExpedienteModel.buscarSolicitudesEspeciales(expediente);
     if (!Solicitudes_Especiales) {
        return result.recordset[0];
     }
     const reporteSolicitudes_Especiales = await this.tieneCamposNulos(Solicitudes_Especiales);
     if (reporteSolicitudes_Especiales === true) {
        return {success: false, message: "El expediente se encuentra en estado Solicitudes Especiales",expediente, estado: "Solicitudes Especiales"};
     }

     const Ubicacion_Expediente = await ExpedienteModel.buscarUbicacionExpediente(expediente);
     if (!Ubicacion_Expediente) {
        return result.recordset[0];
     }
     const reporteUbicacion_Expediente = await this.tieneCamposNulos(Ubicacion_Expediente);
     if (reporteUbicacion_Expediente === true) {
        return {success: false, message: "El expediente se encuentra en estado Ubicacion Expediente",expediente, estado: "Ubicacion Expediente"};
     }

     const Estado_Final = await ExpedienteModel.buscarEstadoFinal(expediente);
     if (!Estado_Final) {
        return result.recordset[0];
     }
     const {estadoFinalFind} = await ExpedienteModel.getEstadoFinalById(Estado_Final.Tipo_Estado_Final_Id);
     const reporteEstado_Final = await this.tieneCamposNulos(Estado_Final);
     if (reporteEstado_Final === true) {
        return {success: false, message: "El expediente se encuentra en Estado Final",expediente, estado: "Estado Final"};
     }


     if(estadoFind.toUpperCase() === "PAGADO" || estadoFinalFind.toUpperCase() === "CADUCADO"){
        return {success: true, message: "El expediente se encuentra en estado Pagado o Caducado ok", expediente, estado: "Paz y Salvo"};
     }

     return result.recordset[0];


  
  }

   static async verificarIUIT(iuit) {
    const pool = await getConnection();
    const query = `SELECT e.Numero_Expediente, e.Placa, e.Nombre_Persona_Natural, ss.Descripcion as Sujeto_Sancionable 
                    FROM Expediente as e
                    LEFT JOIN Sujeto_Sancionable as ss ON e.Sujeto_Sancionable_Id = ss.Id
                    WHERE Numero_Informe_Infraccion = @iuit`;
    const result = await pool
      .request()
      .input("iuit", sql.BigInt, iuit)
      .query(query);

      if(result.recordset.length === 0){
        return {success: null, message: "No se encontró el IUIT.", estado: "No encontrado"};
      }
    const expediente = result.recordset[0].Numero_Expediente;
    const expedienteData = await ExpedienteModel.buscarExpediente(expediente);

    if (!expedienteData) {
      return result.recordset[0];
    }
     const reporteExpediente = await this.tieneCamposNulos(expedienteData);
     console.log(reporteExpediente);
     if (reporteExpediente === true) {
          return {success: false, message: "El expediente se encuentra en estado Expediente",expediente, estado: "Expediente"};
     }

     const Apertura = await ExpedienteModel.buscarApertura(expediente);
     if (!Apertura) {
        return result.recordset[0];
     }
     const reporteApertura = await this.tieneCamposNulos(Apertura);
     if (reporteApertura === true) {
        return {success: false, message: "El expediente se encuentra en estado Apertura",expediente, estado: "Apertura"};
     }

     const Inhibitorio = await ExpedienteModel.buscarInhibitorio(expediente);
     if (!Inhibitorio) {
        return result.recordset[0];
     }
     const reporteInhibitorio = await this.tieneCamposNulos(Inhibitorio);
     if (reporteInhibitorio === true) {
        return {success: false, message: "El expediente se encuentra en estado Inhibitorio",expediente, estado: "Inhibitorio"};
     }
     
     const Auto_Acumulacion = await ExpedienteModel.buscarAutoAcumulacion(expediente);
     if (!Auto_Acumulacion) {
        return result.recordset[0];
     }
     const reporteAuto_Acumulacion = await this.tieneCamposNulos(Auto_Acumulacion);
     if (reporteAuto_Acumulacion === true) {
        return {success: false, message: "El expediente se encuentra en estado Auto Acumulacion",expediente, estado: "Auto Acumulacion"};
     }

     const Pruebas = await ExpedienteModel.buscarPruebas(expediente);
     if (!Pruebas) {
        return result.recordset[0];
     }
     const reportePruebas = await this.tieneCamposNulos(Pruebas);
     if (reportePruebas === true) {
        return {success: false, message: "El expediente se encuentra en estado Pruebas",expediente, estado: "Pruebas"};
     }

     const Aceptacion_Cargos = await ExpedienteModel.buscarAceptacionCargos(expediente);
     if (!Aceptacion_Cargos) {
        return result.recordset[0];
     }
     const reporteAceptacion_Cargos = await this.tieneCamposNulos(Aceptacion_Cargos);
     if (reporteAceptacion_Cargos === true) {
        return {success: false, message: "El expediente se encuentra en estado Aceptacion Cargos",expediente, estado: "Aceptacion Cargos"};
     }

     const Fallo = await ExpedienteModel.buscarFallo(expediente);
     if (!Fallo) {
        return result.recordset[0];
     }
     const reporteFallo = await this.tieneCamposNulos(Fallo);
     if (reporteFallo === true) {
        return {success: false, message: "El expediente se encuentra en estado Fallo",expediente, estado: "Fallo"};
     }

     const Recurso_Primera_Instancia = await ExpedienteModel.buscarRecursoPrimeraInstancia(expediente);
     if (!Recurso_Primera_Instancia) {
        return result.recordset[0];
     }
     const reporteRecurso_Primera_Instancia = await this.tieneCamposNulos(Recurso_Primera_Instancia);
     if (reporteRecurso_Primera_Instancia === true) {
        return {success: false, message: "El expediente se encuentra en estado Recurso Primera Instancia",expediente, estado: "Recurso Primera Instancia"};
     }

     const Recurso_Segunda_Instancia = await ExpedienteModel.buscarRecursoSegundaInstancia(expediente);
     if (!Recurso_Segunda_Instancia) {
        return result.recordset[0];
     }
     const reporteRecurso_Segunda_Instancia = await this.tieneCamposNulos(Recurso_Segunda_Instancia);
     if (reporteRecurso_Segunda_Instancia === true) {
        return {success: false, message: "El expediente se encuentra en estado Recurso Segunda Instancia",expediente, estado: "Recurso Segunda Instancia"};
     }

     const Rec_Queja_Revocatoria = await ExpedienteModel.buscarRecQuejaRevocatoria(expediente);
     if (!Rec_Queja_Revocatoria) {
        return result.recordset[0];
     }
     const reporteRec_Queja_Revocatoria = await this.tieneCamposNulos(Rec_Queja_Revocatoria);
     if (reporteRec_Queja_Revocatoria === true) {
        return {success: false, message: "El expediente se encuentra en estado Rec Queja Revocatoria",expediente, estado: "Rec Queja Revocatoria"};
     }

     const Ejecutoria = await ExpedienteModel.buscarEjecutoria(expediente);
     if (!Ejecutoria) {
        return result.recordset[0];
     }
     const reporteEjecutoria = await this.tieneCamposNulos(Ejecutoria);
     if (reporteEjecutoria === true) {
        return {success: false, message: "El expediente se encuentra en estado Ejecutoria",expediente, estado: "Ejecutoria"};
     }

     const Gestion_Cobro = await ExpedienteModel.buscarGestionCobro(expediente);
     if (!Gestion_Cobro) {
        return result.recordset[0];
     }
     const reporteGestion_Cobro = await this.tieneCamposNulos(Gestion_Cobro);
     if (reporteGestion_Cobro === true) {
        return {success: false, message: "El expediente se encuentra en estado Gestion Cobro",expediente, estado: "Gestion Cobro"};
     }

     const Ajuste_Derecho_Aclaratorio = await ExpedienteModel.buscarAjusteDerAclaratorio(expediente);
     if (!Ajuste_Derecho_Aclaratorio) {
        return result.recordset[0];
     }
     const reporteAjuste_Derecho_Aclaratorio = await this.tieneCamposNulos(Ajuste_Derecho_Aclaratorio);
     if (reporteAjuste_Derecho_Aclaratorio === true) {
        return {success: false, message: "El expediente se encuentra en estado Ajuste Derecho Aclaratorio",expediente, estado: "Ajuste Derecho Aclaratorio"};
     }

     const Estado = await ExpedienteModel.buscarEstado(expediente);
     if (!Estado) {
        return result.recordset[0];
     }
     const {estadoFind} = await ExpedienteModel.getEstadoById(Estado.Tipo_Estado_Id);
     console.log("res:",estadoFind);
     const reporteEstado = await this.tieneCamposNulos(Estado);
     if (reporteEstado === true) {
        return {success: false, message: "El expediente se encuentra en estado Estado",expediente, estado: "Estado"};
     }

     const Asignacion = await ExpedienteModel.buscarAsignacion(expediente);
     if (!Asignacion) {
        return result.recordset[0];
     }
     const reporteAsignacion = await this.tieneCamposNulos(Asignacion);
     if (reporteAsignacion === true) {
        return {success: false, message: "El expediente se encuentra en estado Asignacion",expediente, estado: "Asignacion"};
     }

     
     const Pago_Valor = await ExpedienteModel.buscarPagoValor(expediente);
     if (!Pago_Valor) {
        return result.recordset[0];
     }
     const reportePago_Valor = await this.tieneCamposNulos(Pago_Valor);
     if (reportePago_Valor === true) {
        return {success: false, message: "El expediente se encuentra en estado Pago Valor",expediente, estado: "Pago Valor"};
     }

     const Solicitudes_Especiales = await ExpedienteModel.buscarSolicitudesEspeciales(expediente);
     if (!Solicitudes_Especiales) {
        return result.recordset[0];
     }
     const reporteSolicitudes_Especiales = await this.tieneCamposNulos(Solicitudes_Especiales);
     if (reporteSolicitudes_Especiales === true) {
        return {success: false, message: "El expediente se encuentra en estado Solicitudes Especiales", expediente, estado: "Solicitudes Especiales"};
     }

     const Ubicacion_Expediente = await ExpedienteModel.buscarUbicacionExpediente(expediente);
     if (!Ubicacion_Expediente) {
        return result.recordset[0];
     }
     const reporteUbicacion_Expediente = await this.tieneCamposNulos(Ubicacion_Expediente);
     if (reporteUbicacion_Expediente === true) {
        return {success: false, message: "El expediente se encuentra en estado Ubicacion Expediente",expediente, estado: "Ubicacion Expediente"};
     }

     const Estado_Final = await ExpedienteModel.buscarEstadoFinal(expediente);
     if (!Estado_Final) {
        return result.recordset[0];
     }
     const {estadoFinalFind} = await ExpedienteModel.getEstadoFinalById(Estado_Final.Tipo_Estado_Final_Id);
     const reporteEstado_Final = await this.tieneCamposNulos(Estado_Final);
     if (reporteEstado_Final === true) {
        return {success: false, message: "El expediente se encuentra en Estado Final",expediente, estado: "Estado Final"};
     }


     if(estadoFind.toUpperCase() === "PAGADO" || estadoFinalFind.toUpperCase() === "CADUCADO"){
        return {success: true, message: "El expediente se encuentra en estado Pagado o Caducado ok", expediente, estado: "Paz y Salvo"};
     }

     return result.recordset[0];


  
  }

   static async verificarNumeroResolucion(numeroResolucion) {
    const pool = await getConnection();
    const query = `SELECT e.Numero_Expediente
                    FROM Apertura as a
                    INNER JOIN Expediente as e ON a.Expediente_Id = e.Id
                    WHERE Numero_Resolucion = @numeroResolucion`;
    const result = await pool
      .request()
      .input("numeroResolucion", sql.NVarChar, numeroResolucion)
      .query(query);

      console.log(result);
      if(result.recordset.length === 0){
        return {success: null, message: "No se encontró el Número de Resolución.",expediente, estado: "No encontrado"};
      }
    const expediente = result.recordset[0].Numero_Expediente;
    const expedienteData = await ExpedienteModel.buscarExpediente(expediente);

    if (!expedienteData) {
      return result.recordset[0];
    }
     const reporteExpediente = await this.tieneCamposNulos(expedienteData);
     console.log(reporteExpediente);
     if (reporteExpediente === true) {
          return {success: false, message: "El expediente se encuentra en estado Expediente",expediente, estado: "Expediente"};
     }

     const Apertura = await ExpedienteModel.buscarApertura(expediente);
     if (!Apertura) {
        return result.recordset[0];
     }
     const reporteApertura = await this.tieneCamposNulos(Apertura);
     if (reporteApertura === true) {
        return {success: false, message: "El expediente se encuentra en estado Apertura",expediente, estado: "Apertura"};
     }

     const Inhibitorio = await ExpedienteModel.buscarInhibitorio(expediente);
     if (!Inhibitorio) {
        return result.recordset[0];
     }
     const reporteInhibitorio = await this.tieneCamposNulos(Inhibitorio);
     if (reporteInhibitorio === true) {
        return {success: false, message: "El expediente se encuentra en estado Inhibitorio",expediente, estado: "Inhibitorio"};
     }
     
     const Auto_Acumulacion = await ExpedienteModel.buscarAutoAcumulacion(expediente);
     if (!Auto_Acumulacion) {
        return result.recordset[0];
     }
     const reporteAuto_Acumulacion = await this.tieneCamposNulos(Auto_Acumulacion);
     if (reporteAuto_Acumulacion === true) {
        return {success: false, message: "El expediente se encuentra en estado Auto Acumulacion",expediente, estado: "Auto Acumulacion"};
     }

     const Pruebas = await ExpedienteModel.buscarPruebas(expediente);
     if (!Pruebas) {
        return result.recordset[0];
     }
     const reportePruebas = await this.tieneCamposNulos(Pruebas);
     if (reportePruebas === true) {
        return {success: false, message: "El expediente se encuentra en estado Pruebas",expediente, estado: "Pruebas"};
     }

     const Aceptacion_Cargos = await ExpedienteModel.buscarAceptacionCargos(expediente);
     if (!Aceptacion_Cargos) {
        return result.recordset[0];
     }
     const reporteAceptacion_Cargos = await this.tieneCamposNulos(Aceptacion_Cargos);
     if (reporteAceptacion_Cargos === true) {
        return {success: false, message: "El expediente se encuentra en estado Aceptacion Cargos",expediente, estado: "Aceptacion Cargos"};
     }

     const Fallo = await ExpedienteModel.buscarFallo(expediente);
     if (!Fallo) {
        return result.recordset[0];
     }
     const reporteFallo = await this.tieneCamposNulos(Fallo);
     if (reporteFallo === true) {
        return {success: false, message: "El expediente se encuentra en estado Fallo",expediente, estado: "Fallo"};
     }

     const Recurso_Primera_Instancia = await ExpedienteModel.buscarRecursoPrimeraInstancia(expediente);
     if (!Recurso_Primera_Instancia) {
        return result.recordset[0];
     }
     const reporteRecurso_Primera_Instancia = await this.tieneCamposNulos(Recurso_Primera_Instancia);
     if (reporteRecurso_Primera_Instancia === true) {
        return {success: false, message: "El expediente se encuentra en estado Recurso Primera Instancia",expediente, estado: "Recurso Primera Instancia"};
     }

     const Recurso_Segunda_Instancia = await ExpedienteModel.buscarRecursoSegundaInstancia(expediente);
     if (!Recurso_Segunda_Instancia) {
        return result.recordset[0];
     }
     const reporteRecurso_Segunda_Instancia = await this.tieneCamposNulos(Recurso_Segunda_Instancia);
     if (reporteRecurso_Segunda_Instancia === true) {
        return {success: false, message: "El expediente se encuentra en estado Recurso Segunda Instancia",expediente, estado: "Recurso Segunda Instancia"};
     }

     const Rec_Queja_Revocatoria = await ExpedienteModel.buscarRecQuejaRevocatoria(expediente);
     if (!Rec_Queja_Revocatoria) {
        return result.recordset[0];
     }
     const reporteRec_Queja_Revocatoria = await this.tieneCamposNulos(Rec_Queja_Revocatoria);
     if (reporteRec_Queja_Revocatoria === true) {
        return {success: false, message: "El expediente se encuentra en estado Rec Queja Revocatoria",expediente, estado: "Rec Queja Revocatoria"};
     }

     const Ejecutoria = await ExpedienteModel.buscarEjecutoria(expediente);
     if (!Ejecutoria) {
        return result.recordset[0];
     }
     const reporteEjecutoria = await this.tieneCamposNulos(Ejecutoria);
     if (reporteEjecutoria === true) {
        return {success: false, message: "El expediente se encuentra en estado Ejecutoria",expediente, estado: "Ejecutoria"};
     }

     const Gestion_Cobro = await ExpedienteModel.buscarGestionCobro(expediente);
     if (!Gestion_Cobro) {
        return result.recordset[0];
     }
     const reporteGestion_Cobro = await this.tieneCamposNulos(Gestion_Cobro);
     if (reporteGestion_Cobro === true) {
        return {success: false, message: "El expediente se encuentra en estado Gestion Cobro",expediente, estado: "Gestion Cobro"};
     }

     const Ajuste_Derecho_Aclaratorio = await ExpedienteModel.buscarAjusteDerAclaratorio(expediente);
     if (!Ajuste_Derecho_Aclaratorio) {
        return result.recordset[0];
     }
     const reporteAjuste_Derecho_Aclaratorio = await this.tieneCamposNulos(Ajuste_Derecho_Aclaratorio);
     if (reporteAjuste_Derecho_Aclaratorio === true) {
        return {success: false, message: "El expediente se encuentra en estado Ajuste Derecho Aclaratorio",expediente, estado: "Ajuste Derecho Aclaratorio"};
     }

     const Estado = await ExpedienteModel.buscarEstado(expediente);
     if (!Estado) {
        return result.recordset[0];
     }
     const {estadoFind} = await ExpedienteModel.getEstadoById(Estado.Tipo_Estado_Id);
     console.log("res:",estadoFind);
     const reporteEstado = await this.tieneCamposNulos(Estado);
     if (reporteEstado === true) {
        return {success: false, message: "El expediente se encuentra en estado Estado",expediente, estado: "Estado"};
     }

     const Asignacion = await ExpedienteModel.buscarAsignacion(expediente);
     if (!Asignacion) {
        return result.recordset[0];
     }
     const reporteAsignacion = await this.tieneCamposNulos(Asignacion);
     if (reporteAsignacion === true) {
        return {success: false, message: "El expediente se encuentra en estado Asignacion",expediente, estado: "Asignacion"};
     }

     
     const Pago_Valor = await ExpedienteModel.buscarPagoValor(expediente);
     if (!Pago_Valor) {
        return result.recordset[0];
     }
     const reportePago_Valor = await this.tieneCamposNulos(Pago_Valor);
     if (reportePago_Valor === true) {
        return {success: false, message: "El expediente se encuentra en estado Pago Valor",expediente, estado: "Pago Valor"};
     }

     const Solicitudes_Especiales = await ExpedienteModel.buscarSolicitudesEspeciales(expediente);
     if (!Solicitudes_Especiales) {
        return result.recordset[0];
     }
     const reporteSolicitudes_Especiales = await this.tieneCamposNulos(Solicitudes_Especiales);
     if (reporteSolicitudes_Especiales === true) {
        return {success: false, message: "El expediente se encuentra en estado Solicitudes Especiales",expediente, estado: "Solicitudes Especiales"};
     }

     const Ubicacion_Expediente = await ExpedienteModel.buscarUbicacionExpediente(expediente);
     if (!Ubicacion_Expediente) {
        return result.recordset[0];
     }
     const reporteUbicacion_Expediente = await this.tieneCamposNulos(Ubicacion_Expediente);
     if (reporteUbicacion_Expediente === true) {
        return {success: false, message: "El expediente se encuentra en estado Ubicacion Expediente",expediente, estado: "Ubicacion Expediente"};
     }

     const Estado_Final = await ExpedienteModel.buscarEstadoFinal(expediente);
     if (!Estado_Final) {
        return result.recordset[0];
     }
     const {estadoFinalFind} = await ExpedienteModel.getEstadoFinalById(Estado_Final.Tipo_Estado_Final_Id);
     const reporteEstado_Final = await this.tieneCamposNulos(Estado_Final);
     if (reporteEstado_Final === true) {
        return {success: false, message: "El expediente se encuentra en Estado Final",expediente, estado: "Estado Final"};
     }


     if(estadoFind.toUpperCase() === "PAGADO" || estadoFinalFind.toUpperCase() === "CADUCADO"){
        return {success: true, message: "El expediente se encuentra en estado Pagado o Caducado ok", expediente, estado: "Paz y Salvo"};
     }

     return result.recordset[0];


  
  }

  static async verificarSujetoNit(nit, sujeto){
     const pool = await getConnection();
     const query = `SELECT e.Numero_Expediente, e.Identificacion, e.Nombre_Persona_Natural, ss.Descripcion as Sujeto_Sancionable 
                    FROM Expediente as e
                    LEFT JOIN Sujeto_Sancionable as ss ON e.Sujeto_Sancionable_Id = ss.Id
                    WHERE Identificacion = @nit AND ss.Descripcion = @sujeto OR Identificacion = @nit AND e.Nombre_Persona_Natural = @sujeto`;
     const result = await pool
          .request()
          .input("nit", sql.BigInt, nit)
          .input("sujeto", sql.NVarChar, sujeto)
          .query(query);
     return result.recordset;
         
  }
}
