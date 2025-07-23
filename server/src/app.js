import express from 'express';
import cors from 'cors'; 
import{ planetsRouter } from './routes/planets/planets.router.js';
import { customERrorMiddleware } from './middleware/customError.middleware.js';
import dotenv from 'dotenv';   
dotenv.config();

const app = express();

app.all('*', (req, res, next) => {
    // Handle all undefined routes
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(cors({
    origin: '*' // Adjust the origin as needed 
}));
app.use(express.json());
app.use('/api', planetsRouter);

app.use(customERrorMiddleware); 
export {
    app
}