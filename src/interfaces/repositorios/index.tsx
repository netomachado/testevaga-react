export interface AllRepositories {
  name: string;
  qteRepositorios: number;
  repositorios: DetailsRepo[];
}

export interface DetailsRepo {
  nameRepo: string;
  description: string;
  language: string;
  url: string;
}

export interface DadosPesquisaRepo {
  name: string;
  id: number;
}