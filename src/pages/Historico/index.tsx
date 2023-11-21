import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usuarioLogadoContext from "../../shared/contexts";
import MenuAppBar from "../../shared/components/headerbar";
import {
  getHistoryRepo,
} from "../../services/gitRepositories";
import Box from "@mui/material/Box";
import { Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { historicoPesquisa } from "../../interfaces/historico";
import Logout from "@mui/icons-material/Logout";

//TODO - implementar a exclusao do historico
//TODO - implementar o direcionamento do detalhe do usuario
//TODO - implementar o direcionamento para a pagina de repositorios

export const Historico = () => {
  const navigate = useNavigate();
  const usuario = usuarioLogadoContext();
  const [hasPesquisa, setHasPesquisa] = useState<boolean>(false);
  const [pesquisa, setPesquisa] = useState<historicoPesquisa[]>([]);

  useMemo(() => {
    if (!usuario.usuario.username) {
      navigate("/login");
    }
    const id = usuario.usuario.id;
    if (id) {
      getHistoryRepo(id).then((res) => {
        if (res.length > 0) {
          setPesquisa(res);
          setHasPesquisa(true);
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
            <div className="flex w-11/12 flex-row items-center ">
              <label className="flex w-3/12 flex-col text-1g font-semibold m-5">
                Total pesquisado
              </label>
              <Typography variant="subtitle1" component="div">
                {pesquisa.length}
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
          {hasPesquisa &&
            pesquisa.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-10/12 flex-col bg-white my-5"
                >
                  <div className="flex w-11/12 flex-row items-right m-5">
                    <div className="flex w-11/12 flex-col items-right">
                      <Typography variant="h6" component="div">
                        {item.username}
                        <Logout sx={{ marginLeft: "5px", fontSize: "small" }} />
                      </Typography>
                      <Typography variant="subtitle1" component="div">
                        Pesquisado em {item.datahora}
                      </Typography>
                      <Typography variant="subtitle1" component="div">
                        Total de Repositorios encontrados :{" "}
                        {item.qteRepositorios}
                        <Logout sx={{ marginLeft: "5px", fontSize: "small" }} />
                      </Typography>
                    </div>
                    <div className="flex w-1/12 flex-row justify-end mt-5">
                      <DeleteIcon />
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
