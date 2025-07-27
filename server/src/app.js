"use strict";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { planetsRouter } from "./routes/planets/planets.router.js";
import { launchesRouter } from "./routes/launches/launches.router.js";
import dotenv from "dotenv";
import { globalErrorHandler } from "./utils/errorHandler.utils.js";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(morgan('dev'));// Logging middleware 



app.use(cors({
    
    origin: '*' // Adjust the origin as needed 
}));






app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));


app.use('/api/planets', planetsRouter);
app.use('/api/launches',launchesRouter);
app.use('*route', (req, _res, _next) => {
    // Handle all undefined routes
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
});

app.get('/api/*route',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
});


app.use(globalErrorHandler); 

export { app };