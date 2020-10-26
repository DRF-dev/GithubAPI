import Axios from 'axios';
import { Request, Response } from 'express';

export class Controller {
  public static async getRateLimit(req: Request, res: Response) {
    try {
      const { data } = await Axios.get("https://api.github.com/rate_limit", {
        headers: {
          Authorization: `token ${process.env.TOKEN}`
        }
      });
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getAllRepos(req: Request, res: Response) {
    try {
      const { data } = await Axios.get("https://api.github.com/users/DRF-dev/repos", {
        headers: {
          Authorization: `token ${process.env.TOKEN}`
        }
      });
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  public static async getAllLanguages(req: Request, res: Response) {
    try {

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}