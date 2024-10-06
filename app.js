import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import UserRoute from './src/routes/user.router.js';
import ExpedienteRoute from './src/routes/expediente.router.js';
import { verificarToken } from './src/middlewares/verificarToken.middleware.js';
import ReporteRoute from './src/routes/reporte.router.js';
import path from 'path';
import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

// rutas 
app.use(UserRoute);
app.use('/expediente',verificarToken, ExpedienteRoute);
app.use(ReporteRoute);




export default app;