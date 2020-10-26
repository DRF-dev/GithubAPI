import { Router } from 'express';
import { Controller } from '../controllers';

class GithubRoutes {
  public router: Router = Router();
  public constructor() {
    this.init();
  }

  public init() {
    this.router.get('/limit', Controller.getRateLimit);
    this.router.get('/repos', Controller.getAllRepos);
  }
}

export default new GithubRoutes().router;