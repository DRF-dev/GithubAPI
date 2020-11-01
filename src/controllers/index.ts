import Axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';
import { Env } from '../helpers/dotenv';
import { IAllRepos, ILang, langType } from '../helpers/interfaces';

class Controller {
  public options: AxiosRequestConfig = {
    headers: {
      Authorization: `token ${Env.TOKEN}`,
    },
  };

  private allLanguages = async () => {
    const allRepos = await Axios.get<IAllRepos[]>('https://api.github.com/users/DRF-dev/repos', this.options);
    return Promise.all(allRepos.data.map(async (repo) => (await Axios.get<ILang>(repo.languages_url, this.options)).data));
  };

  private sumLang = (languages: ILang[], langName: langType): Promise<number> => new Promise((resolve) => {
    const sumLang = languages.map((lang) => {
      for (const key in lang) {
        if (key === langName) {
          return lang[key];
        }
      }
      return 0;
    });
    resolve(sumLang.reduce((prevValue, nextValue) => prevValue + nextValue));
  });

  public getRateLimit = async (req: Request, res: Response) => {
    try {
      const { data } = await Axios.get('https://api.github.com/rate_limit', this.options);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  public getAllRepos = async (req: Request, res: Response) => {
    try {
      const { data } = await Axios.get<IAllRepos[]>('https://api.github.com/users/DRF-dev/repos', this.options);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  public getAllLanguages = async (req: Request, res: Response) => {
    try {
      const languages = await this.allLanguages();
      return res.status(200).json({ data: languages });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  public getPointForEachLanguages = async (req: Request, res: Response) => {
    try {
      const all = await this.allLanguages();
      const langs = await Promise.all([
        this.sumLang(all, 'JavaScript'),
        this.sumLang(all, 'TypeScript'),
        this.sumLang(all, 'Python'),
        this.sumLang(all, 'PHP'),
        this.sumLang(all, 'Kotlin'),
        this.sumLang(all, 'Java'),
        this.sumLang(all, 'HTML'),
        this.sumLang(all, 'Go'),
        this.sumLang(all, 'Dockerfile'),
        this.sumLang(all, 'CSS'),
      ]);
      return res.status(200).json({
        JavaScript: langs[0],
        TypeScript: langs[1],
        Python: langs[2],
        PHP: langs[3],
        Kotlin: langs[4],
        Java: langs[5],
        HTML: langs[6],
        Go: langs[7],
        Docker: langs[8],
        CSS: langs[9],
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  };
}

export default new Controller();
