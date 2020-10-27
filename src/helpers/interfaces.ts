type langType = "JavaScript" | "HTML" | "CSS" | "TypeScript" | "Kotlin" | "Python" | "Go" | "Dockerfile" | "Java" | "PHP";

interface IAllRepos {
  languages_url: string;
}

type ILang = {
  [propname in langType]: number;
};

export type { IAllRepos, ILang };
