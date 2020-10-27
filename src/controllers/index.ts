import Axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { Env } from '../helpers/dotenv';
import { IAllRepos, ILang } from '../helpers/interfaces';

class Controller {
  public options: AxiosRequestConfig = {
    headers: {
      Authorization: `token ${Env.TOKEN}`
    }
  };

  public getRateLimit = async (req: Request, res: Response) => {
    try {
      const { data } = await Axios.get("https://api.github.com/rate_limit", this.options);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  public getAllRepos = async (req: Request, res: Response) => {
    try {
      const { data } = await Axios.get<IAllRepos[]>("https://api.github.com/users/DRF-dev/repos", this.options);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  public getAllLanguages = async (req: Request, res: Response) => {
    try {
      const allRepos = await Axios.get<IAllRepos[]>("https://api.github.com/users/DRF-dev/repos", this.options);
      const languages = await Promise.all(allRepos.data.map(async (repo) => {
        return (await Axios.get<ILang>(repo.languages_url, this.options)).data;
      }));
      return res.status(200).json({ data: languages });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  public getPointForEachLanguages = async (req: Request, res: Response) => {
    try {
      const allRepos = await Axios.get<IAllRepos[]>("https://api.github.com/users/DRF-dev/repos", this.options);
      let js = 0, html = 0, css = 0, ts = 0, kotlin = 0, py = 0, go = 0, docker = 0, java = 0, php = 0;
      for (let i = 0; i < allRepos.data.length; i++) {
        const { data } = await Axios.get<ILang>(allRepos.data[i].languages_url, this.options);
        for (const key in data) {
          switch (key) {
            case "CSS":
              css += data[key];
              break;
            case "Dockerfile":
              docker += data[key];
              break;
            case "Go":
              go += data[key];
              break;
            case "HTML":
              html += data[key];
              break;
            case "Java":
              java += data[key];
              break;
            case "JavaScript":
              js += data[key];
              break;
            case "Kotlin":
              kotlin += data[key];
              break;
            case "PHP":
              php += data[key];
              break;
            case "Python":
              py += data[key];
              break;
            case "TypeScript":
              ts += data[key];
              break;
            default:
              break;
          }
        }
      }
      return res.status(200).json({ js, html, css, ts, kotlin, py, go, docker, java, php });
    } catch (err) {
      return res.status(500).json({ err });
    }
  };
}

export default new Controller();