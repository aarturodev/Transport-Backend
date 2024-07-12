import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import LoginRoute from './app/routes/login.route.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// rutas 
app.use(LoginRoute);




export default app;