import { createContext, useContext, useState } from "react";
import { UsuarioLogado } from "../../interfaces/usuario";

type IUsuarioLogado = {
  usuario: UsuarioLogado;
  setUsuario: (usuario: UsuarioLogado) => void;
};

type UserContextProps = {
  children: React.ReactNode;
};

const UserContext = createContext<IUsuarioLogado>({} as IUsuarioLogado);

export const UserProvider = ({ children }: UserContextProps) => {
  const [usuario, setUsuario] = useState<UsuarioLogado>({} as UsuarioLogado);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export default function usuarioLogadoContext() {
  return useContext(UserContext);
}
