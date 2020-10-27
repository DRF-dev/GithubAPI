import { Router } from 'express';
import Controller from '../controllers';

class GithubRoutes {
  public router: Router = Router();
  public constructor() {
    this.routes();
  }

  public routes() {
    this.router.get('/limit', Controller.getRateLimit);
    this.router.get('/repos', Controller.getAllRepos);
    this.router.get('/lang', Controller.getAllLanguages);
    this.router.get('/skills', Controller.getPointForEachLanguages);
  }
}

export default new GithubRoutes().router;