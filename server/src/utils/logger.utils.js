
import fs from 'fs';
import path from 'path';
import { AppError } from './AppError.utils.js';


function logErrorToFile(err) {
    // Log error details to a file
    const data= new Date();
    const today=data.toISOString().split(':')[0].split('T')[0];
    const logFilePath = path.join('logs', `${today}.log`);

    const errorType = err instanceof AppError ? 'Operational Error' : 'Programming Error';
    const errorLog = `
    ErrorType: ${errorType}
    Environment: ${process.env.NODE_ENV}
    Time: ${new Date().toISOString()}
    Name: ${err.name}
    Message: ${err.message}
    Stack: ${err.stack}
    
    `;
        if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
        }
    
    fs.appendFile(logFilePath, errorLog, (error) => {
    if (error) {
    console.error('Failed to write to log file:', error);
    }
});
}





export{
    logErrorToFile,
}