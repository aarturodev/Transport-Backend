import { createReport } from "docx-templates";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url"; // Necesario para convertir `import.meta.url` a rutas de archivo
import { ReporteModel } from "../models/reporte.model.js";
import { ExpedienteModel } from "../models/expediente.model.js";
import { log, table } from "console";

export class ReporteController {
  static Normalizar(data) {
  const esArray = Array.isArray(data.iuit);

  if (esArray) {
    return data.iuit.map((_, index) => ({
      iuit: data.iuit[index],
      resolucion: data.resolucion[index],
      placa: Array.isArray(data.placa) ? data.placa[0]: data.placa,  // Concatenar placas en un string
      estado: data.estado[index],
      expediente: data.expediente[index],
    }));
  } else {
    return [{
      iuit: data.iuit,
      resolucion: data.resolucion,
      placa: Array.isArray(data.placa) ? data.placa : data.placa,  // Concatenar placas en un string
      estado: data.estado,
      expediente: data.expediente,
    }];
  }
}


  static async getReporte(req, res) {
    try {
      const { expediente, estado, sujeto, iuit, resolucion, placa } = req.query;

      console.log( req.query);
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      // Ruta al directorio `public` (donde está tu plantilla)
      const root = path.join(__dirname, "../public");

      // Leer el archivo de la plantilla .docx
      const pathTemplate = await fs.readFile(path.join(root, "template.docx"));

      
      const tabla = ReporteController.Normalizar(req.query);
      console.log("tablas Normalizada: ",tabla);

      const data = {
        fecha: new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        table: tabla,
      };

      // Generar el reporte en formato DOCX
      const buffer = await createReport({
        template: pathTemplate,
        data: data,
        cmdDelimiter: ["+++", "+++"],
        
      });

      // Definir el nombre y la ruta del archivo DOCX que se generará
      const pathReport = path.join(root, "report.docx");

      // Guardar el archivo generado como .docx en el servidor
      await fs.writeFile(pathReport, buffer);

      // Configurar encabezados para descargar el archivo como un attachment
      res.setHeader("Content-Disposition", "attachment; filename=report.docx");
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

    if (!data) {
      res.json({ success: false, message: "No se recibió información." });
      return;
    }
    switch (data.TipoBusqueda) {
      case "Placa":
        {
          const result = await ReporteModel.verificarPlaca(
            data.Numero_Busqueda
          );

          if (result.success === null) {
            res.json({ result });
            return;
          }

          const verificacion = await ReporteModel.verificarSujetoNit(
            data.Nit_Solicitante,
            data.Nombre_Solicitante
          );

          res.json({ result, verificacion, sujeto: data.Nombre_Solicitante });
        }
        break;
      case "IUIT":
        {
          const result = await ReporteModel.verificarIUIT(data.Numero_Busqueda);
          console.log(result);
          if (result.success === null) {
            res.json({ result });
            return;
          }

          const verificacion = await ReporteModel.verificarSujetoNit(
            data.Nit_Solicitante,
            data.Nombre_Solicitante
          );
          console.log(verificacion);
          res.json({ result, verificacion, sujeto: data.Nombre_Solicitante });
        }
        break;
      case "Numero_Resolucion":
        {
          const result = await ReporteModel.verificarNumeroResolucion(
            data.Numero_Busqueda
          );
          console.log(result);
          if (result.success === null) {
            res.json({ result });
            return;
          }

          const verificacion = await ReporteModel.verificarSujetoNit(
            data.Nit_Solicitante,
            data.Nombre_Solicitante
          );
          console.log(verificacion);
          res.json({ result, verificacion, sujeto: data.Nombre_Solicitante });
        }
        break;
    }
  }
}
