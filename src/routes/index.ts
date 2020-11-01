import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { createServer } from 'http';
import morgan from 'morgan';
import { Env } from '../helpers/dotenv';
import githubRouter from './githubRoute';

class Routes {
  public app = express();

  public constructor(private PORT: number) { }

  private basicProtectApp = () => {
    this.app.use(helmet())
      .use(morgan('common'))
      .use(cors())
      .use(json())
      .use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
      }));
  };

  public build = () => {
    this.basicProtectApp();

    this.app.use('/git', githubRouter);
  };

  public createServer = () => {
    const server = createServer(this.app);
    server.listen(this.PORT, () => console.log(`Serveur sur le port ${this.PORT}`));
  };
}

export default new Routes(Env.PORT);
