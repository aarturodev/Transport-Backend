import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import UserRoute from './src/routes/user.router.js';
import ExpedienteRoute from './src/routes/expediente.router.js';


const app = express();

app.use(cors({
     origin: 'http://localhost:4200',
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(cookieParser());

// rutas 
app.use(UserRoute);
app.use('/expediente', ExpedienteRoute);




export default app;