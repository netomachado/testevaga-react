import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usuarioLogadoContext from "../../shared/contexts";
import MenuAppBar from "../../shared/components/headerbar";
import { searchRepository } from "../../services/gitRepositories";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { TextField, Tooltip, Typography } from "@mui/material";
import {
  AllRepositories,
  DadosPesquisaRepo,
} from "../../interfaces/repositorios";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";

export const Repositorios = () => {
  const navigate = useNavigate();
  const usuario = usuarioLogadoContext();
  const [hasRepo, setHasRepo] = useState(false);
  const [repositorios, setRepositorios] = useState<AllRepositories>({} as AllRepositories);

  useMemo(() => {
    if (!usuario.usuario.username) {
      navigate("/login");
    }
    const url = window.location.href;
    const username = url.split("/").pop();
    if (username) {
      const id = usuario.usuario.id;
      searchRepository(username, id).then((res) => {
        if (res.repositorios.length > 0) {
          setRepositorios(res);
          setHasRepo(true);
        }
      });
    } else {
      navigate("/pesquisa");
    }
  }, []);

  return (
    <>
      <MenuAppBar />
      <Box>
        <div className="flex w-11/12 flex-col min-h-full items-center bg-slate-200 m-5">
          <div className="flex w-11/12 flex-row items-center bg-white my-5">
            <div className="flex w-11/12 flex-col items-left ">
              <Typography variant="subtitle1" component="div">
                Repositorio do Usuário : {repositorios.name}
                <Logout
                  sx={{ marginLeft: "5px", fontSize: "small" }}
                  onClick={() => {
                    navigate("/usuario");
                  }}
                />
              </Typography>
              <Typography variant="subtitle1" component="div">
                Total encontrado : {repositorios.qteRepositorios}
              </Typography>
            </div>
            <div className="flex w-1/12 flex-row justify-end mr-5">
              <Tooltip title="Pesquisar">
                <SearchIcon
                  onClick={() => {
                    navigate("/pesquisa");
                  }}
                />
              </Tooltip>
            </div>
          </div>
          {hasRepo &&
            repositorios.repositorios.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-10/12 flex-col bg-white my-5"
                >
                  <div className="flex w-11/12 flex-row items-right m-5">
                    <div className="flex w-11/12 flex-col items-right">
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="h6" component="div">
                          {item.nameRepo}
                        </Typography>
                      </Link>
                      <Typography variant="subtitle1" component="div">
                        {item.description && item.description !== null
                          ? item.description
                          : "Sem descrição"}
                      </Typography>
                      <Typography variant="subtitle1" component="div">
                        {item.language}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Box>
    </>
  );
};
