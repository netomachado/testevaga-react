import api from "../api";
import { UsuarioLogado } from "./../../interfaces/usuario/index";

export const create = async (
  email: string,
  password: string,
  username: string
) => {
  const { data } = await api
    .post<UsuarioLogado>("/users/signup", {
      email,
      password,
      username,
    })
    .catch((error) => {
      return error;
    });

  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api
    .post<UsuarioLogado>("/users/signin", {
      email,
      password,
    })
    .catch((error) => {
      return error;
    });

  return data;
};

//TODO - implementar a rota no back de confirmação se o usuario esta autenticado
export const usuarioAutenticado = async () => {
  const token = sessionStorage.getItem("token");

  api
    .post<UsuarioLogado>("/me", {
      token,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
