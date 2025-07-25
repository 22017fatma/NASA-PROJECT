import { habitablePlanets } from '../../models/planets.model.js';
import { AppError } from '../../utils/AppError.utils.js';


function getAllPlanets(req, res, next) {
    try {
    if (habitablePlanets && habitablePlanets.length > 0) {
        res.status(200).json({
        status: 'success',
        data: {
        planets: habitablePlanets,
        },
        });
    } else {
        // If no habitable planets are found, throw an error
        throw new AppError('No habitable planets found', 404);
    }
    } catch (error) {
        console.error('Error in getAllPlanets:', error.message);
        next(error);
        }
}

    export{
        getAllPlanets,
    };