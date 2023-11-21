export interface IUsuario {
  email: string
  password: string
  usuarioGitHub: string
}

export interface UsuarioLogado {
  username: string
  token: string
  id: number
  email: string
  avatar: string
}

export interface RepositorioUsuario{
  id: number
  userId: number
  nome: string
  tagUsuario: string
  qteSeguidores: number
  qtePessoasSeguindo: number
  qteRepositorios: number
  biografia: string
  email: string
  twitter: string
  nomeEmpresa: string
  website: string
  avatar: string
}





