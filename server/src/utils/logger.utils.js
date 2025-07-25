
import fs from 'fs';
import path from 'path';


function logErrorToFile(err) {
    const logFilePath=path.join('logs','error.log')
    const errorLog = `
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