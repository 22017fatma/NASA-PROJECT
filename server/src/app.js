'use strict';
import express from 'express';
import cors from 'cors'; 
import{ planetsRouter } from './routes/planets/planets.router.js';
import {  globalErrorHandler } from './middlewares/customError.middleware.js';
import { AppError } from './utils/AppError.utils.js';
import dotenv from 'dotenv';   
dotenv.config();
const app = express();

app.use(cors({
    
    origin: '*' // Adjust the origin as needed 
}));
app.use(express.json());
app.use('/api', planetsRouter);

app.use('*route', (req, _res, _next) => {
    // Handle all undefined routes
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
});

app.use(globalErrorHandler); 
export {
    app
}