import { Button, Divider, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usuarioLogadoContext from "../../shared/contexts";
import MenuAppBar from "../../shared/components/headerbar";

export const Pesquisa = () => {
  const navigate = useNavigate();
  const [pesquisa, setPesquisa] = useState("");
  const usuario = usuarioLogadoContext();

  useEffect(() => {
    if (!usuario.usuario.username) {
      navigate("/login");
    }
  }, []);

  const handleSearch = () => {
    if (pesquisa !== "") {
      navigate(`/repositorios/${pesquisa}`);
    }
  };

  const handleHistorico = () => {
    navigate("/historico");
  };

  return (
    <>
      <MenuAppBar />
      <main className="flex h-screen flex-col items-center justify-center gap-10 bg-zinc-200">
        <div className="flex h-1/3 w-3/5 flex-col items-center justify-around rounded-lg border bg-zinc-100 p-6 shadow-xl">
          <div className="flex w-full flex-1 flex-col items-center justify-around gap-4">
            <label className="flex flex-col text-3xl font-semibold">
              Pesquisa de Repositórios
            </label>

            <label className="flex flex-col justify-center gap-6 text-center text-lg font-normal text-zinc-950">
              <Divider variant="middle" />
              Coloque o username do GitHub para listar os repositórios que estão
              publicados.
            </label>
            <form className="flex w-full max-w-lg flex-col gap-6">
              <div className="flex flex-col gap-1 p-2">
                <label className="text-xl font-semibold">Usuário</label>
                <TextField
                  fullWidth
                  type="text"
                  onBlur={(e) => setPesquisa(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-around w-80">
          <Button variant="contained" onClick={handleHistorico}>
            Histórico
          </Button>
          <Button variant="contained" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
      </main>
    </>
  );
};
