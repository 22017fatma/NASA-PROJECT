import http from 'http';

import { app } from './app.js';
import { loadPlanetsData} from './models/planets.model.js';



console.log(' ENVIRONMENT:', process.env.NODE_ENV);



const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
async function startServer() {
  try {
    await loadPlanetsData();  
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Failed to load planets data:', error);
  }
}
startServer();



