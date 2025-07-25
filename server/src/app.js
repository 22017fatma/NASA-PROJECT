'use strict';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import{ planetsRouter } from './routes/planets/planets.router.js';
import { launchesRouter } from './routes/planets/launches/launches.router.js';
import {  globalErrorHandler } from './middlewares/customError.middleware.js';
import { AppError } from './utils/AppError.utils.js';
import dotenv from 'dotenv';   
dotenv.config();
const app = express();

app.use(morgan('combined'));// Logging middleware 

app.use(cors({
    
    origin: '*' // Adjust the origin as needed 
}));



app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

app.use('/api', planetsRouter);
app.use('/api/launches',launchesRouter);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
});

// app.use('*route', (req, _res, _next) => {
//     // Handle all undefined routes
//     throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
// });

app.use(globalErrorHandler); 
export {
    app
}