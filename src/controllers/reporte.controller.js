import { createReport } from "docx-templates";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url"; // Necesario para convertir `import.meta.url` a rutas de archivo
import { ReporteModel } from "../models/reporte.model.js";
import { ExpedienteModel } from "../models/expediente.model.js";
import { log } from "console";

export class ReporteController {
  static async getReporte(req, res) {
    try {
      const { expediente, estado, sujeto } = req.query;
      console.log("expediente: ", req.query);

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      // Ruta al directorio `public` (donde está tu plantilla)
      const root = path.join(__dirname, "../public");

      // Leer el archivo de la plantilla .docx
      const pathTemplate = await fs.readFile(path.join(root, "template.docx"));

      const dataExpediente = await ExpedienteModel.buscarExpediente(expediente);
      console.log("data expediente: ",dataExpediente);
      const data = {
        nombre: sujeto,
        fecha: new Date().toLocaleDateString(),
        asunto:  `Paz y Salvo del expediente ${dataExpediente.Numero_Expediente}`.toUpperCase(),
        placa: dataExpediente.Placa,
        iuit: dataExpediente.Numero_Informe_Infraccion,
        fecha_hechos: dataExpediente.Fecha_Hechos.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
        estado: estado,
      };

      // Generar el reporte en formato DOCX
      const buffer = await createReport({
        template: pathTemplate,
        data: data,

      });

      // Definir el nombre y la ruta del archivo DOCX que se generará
      const pathReport = path.join(root, "report.docx");

      // Guardar el archivo generado como .docx en el servidor
      await fs.writeFile(pathReport, buffer);

      // Configurar encabezados para descargar el archivo como un attachment
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=report.docx"
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      // Enviar el archivo como respuesta
      res.sendFile(pathReport, (err) => {
        if (err) {
          console.error("Error al enviar el archivo:", err);
          if (!res.headersSent) {
            res.status(500).send("Error al enviar el archivo.");
          }
        }
      });
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      res.status(500).send("Error al generar el reporte.");
    }
  }


  static async verificarReporte(req, res) {
    const data = req.body;

    if(!data){
      res.json({ success: false, message: "No se recibió información." });
      return;
    }
    switch (data.TipoBusqueda) {
      case "Placa": {
        const result = await ReporteModel.verificarPlaca(data.Numero_Busqueda);
        console.log(result);
        if(result.success === null){
          res.json({result});
          return;
        }

        const verificacion = await ReporteModel.verificarSujetoNit(data.Nit_Solicitante, data.Nombre_Solicitante)
        console.log(verificacion);
        res.json({ result, verificacion, sujeto: data.Nombre_Solicitante });
        
        
      }
      break;
      case "IUIT": {
         const result = await ReporteModel.verificarIUIT(data.Numero_Busqueda);
        console.log(result);
        if(result.success === null){
          res.json({result});
          return;
        }

        const verificacion = await ReporteModel.verificarSujetoNit(data.Nit_Solicitante, data.Nombre_Solicitante)
        console.log(verificacion);
        res.json({ result, verificacion, sujeto: data.Nombre_Solicitante });
      }
      break;
      case "Numero_Resolucion": {
        const result = await ReporteModel.verificarNumeroResolucion(data.Numero_Busqueda);
        console.log(result);
        if(result.success === null){
          res.json({result});
          return;
        }

        const verificacion = await ReporteModel.verificarSujetoNit(data.Nit_Solicitante, data.Nombre_Solicitante)
        console.log(verificacion);
        res.json({ result, verificacion, sujeto: data.Nombre_Solicitante });
      }
      break;
    }
  }
}
