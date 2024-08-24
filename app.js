import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import UserRoute from './src/routes/user.router.js';
import ExpedienteRoute from './src/routes/expediente.router.js';
import { verificarToken } from './src/middlewares/verificarToken.middleware.js';


const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

// rutas 
app.use(UserRoute);
app.use('/expediente',verificarToken, ExpedienteRoute);




export default app;