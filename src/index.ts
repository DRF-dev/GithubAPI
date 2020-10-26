import { config } from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Routes } from './routes';


(async () => {
  config();
  const app = express();
  const server = createServer(app);
  Routes.build(app);
  server.listen(process.env.PORT, () => console.log(`Serveur sur le port ${process.env.PORT}`));
})();