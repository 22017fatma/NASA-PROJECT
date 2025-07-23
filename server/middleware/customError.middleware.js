export {globalErrorHandler} from '../utils/errorHandler.utils.js';

function customERrorMiddleware(err, req, res, next) {
    globalErrorHandler(err, req, res, next);
}

export{
    customERrorMiddleware
};