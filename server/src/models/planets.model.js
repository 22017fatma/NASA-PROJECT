
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import {AppError} from '../utils/AppError.utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { parse } from 'csv-parse';
const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};


function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    console.log(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'));
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (err) => {
        reject(new AppError('Failed to parse CSV file', 500, err));
      })
      .on('end', () => {
        console.log(habitablePlanets.map((planet) => {
          return planet['kepler_name'];
        }));
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      })
});
}
export{
    habitablePlanets,
    loadPlanetsData,
};