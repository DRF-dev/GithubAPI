import { json } from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import githubRouter from './githubRoute';


export class Routes {
  public static build(app: Application) {
    this.basicProtectApp(app);

    app.use('/git', githubRouter);
  }

  private static basicProtectApp(app: Application) {
    app.use(helmet())
      .use(morgan('common'))
      .use(cors())
      .use(json())
      .use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
      }));
  }
}