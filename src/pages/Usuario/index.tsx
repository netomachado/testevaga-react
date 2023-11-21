import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import usuarioLogadoContext from "../../shared/contexts";
import MenuAppBar from "../../shared/components/headerbar";
import Box from "@mui/material/Box";
import { Avatar, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TwitterIcon from "@mui/icons-material/Twitter";
import BusinessIcon from "@mui/icons-material/Business";
import WebIcon from "@mui/icons-material/Web";
import { getUserRepository } from "../../services/gitRepositories";
import { RepositorioUsuario } from "./../../interfaces/usuario/index";

export const Usuario = () => {
  const navigate = useNavigate();
  const usuario = usuarioLogadoContext();
  const [repositorioUser, setRepositorioUser] = useState<RepositorioUsuario>(
    {} as RepositorioUsuario
  );

  //TODO - implementar apresentar os dados quando nao é o usuario e sim o pesquisado
  //TODO - implementar a edicao dos dados do usuario logado - trocar email, senha e nome
  //TODO - se for acessado com os dados do pesquisado tirar o botoa editar e logout
  //TODO - quando clicar no total de repositorios deve direcionar para a pagina de repositorios
  //TODO - implentar o link pra ir para a pagina do twitter e site proprio do usuario

  useMemo(() => {
    if (!usuario.usuario.username) {
      navigate("/login");
    } else {
      getUserRepository(usuario.usuario.username).then((res) => {
        setRepositorioUser(res);
      });
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleLastPage = () => {
    window.history.back();
  };

  return (
    <>
      <MenuAppBar />
      <Box>
        <div className="flex w-11/12 flex-col min-h-full items-center bg-slate-200 m-5">
          <div className="flex w-full flex-row justify-between">
            <Tooltip title="Voltar">
              <ChevronLeftIcon onClick={handleLastPage} />
            </Tooltip>
            <Tooltip title="Logout">
              <LogoutIcon onClick={handleLogout} />
            </Tooltip>
          </div>
          <div className="flex w-11/12 flex-row items-center  mt-3 ml-3">
            <div className="flex w-11/12 flex-row items-center">
              <div className="mx-5">
                <Avatar
                  alt="Remy Sharp"
                  src={`${repositorioUser.avatar}`}
                  sx={{ width: 56, height: 56 }}
                />
              </div>
              <div className="flex w-3/12 flex-col items-right">
                <Typography variant="h6" component="div">
                  {repositorioUser.nome
                    ? repositorioUser.nome
                    : usuario.usuario.username}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  {repositorioUser.tagUsuario
                    ? repositorioUser.tagUsuario
                    : usuario.usuario.username}
                </Typography>
              </div>
              <div className="flex w-9/12 flex-row justify-between bg-white">
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ margin: "12px" }}
                >
                  {repositorioUser.qteSeguidores
                    ? repositorioUser.qteSeguidores
                    : "0"}{" "}
                  Seguidores
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ margin: "12px" }}
                >
                  {repositorioUser.qtePessoasSeguindo
                    ? repositorioUser.qtePessoasSeguindo
                    : "0"}{" "}
                  Seguindo
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ margin: "12px" }}
                >
                  {repositorioUser.qteRepositorios
                    ? repositorioUser.qteRepositorios
                    : "0"}{" "}
                  Repositórios
                  <LogoutIcon
                    onClick={() =>
                      navigate(`/repositorios/${usuario.usuario.username}`)
                    }
                  />
                </Typography>
              </div>
              <div className="flex w-1/12 flex-row justify-end">
                <Tooltip title="Editar">
                  <EditIcon />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex w-10/12 flex-col bg-white mt-5">
            <div className="flex w-11/12 flex-col items-right m-5">
              <Typography variant="h6" component="div">
                Bio
              </Typography>
              <Typography variant="subtitle1" component="div">
                {repositorioUser.biografia && repositorioUser.biografia !== null
                  ? repositorioUser.biografia
                  : "Sem biografia"}
              </Typography>
            </div>
          </div>
          <div className="flex w-10/12 flex-col bg-white my-5">
            <div className="flex w-11/12 flex-row justify-between ">
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ margin: "12px" }}
              >
                <MailOutlineIcon sx={{ marginRight: "3px" }} />
                {repositorioUser.email && repositorioUser.email !== null
                  ? repositorioUser.email
                  : "Sem email"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ margin: "12px" }}
              >
                <TwitterIcon sx={{ marginRight: "3px" }} />
                {repositorioUser.twitter && repositorioUser.twitter !== null
                  ? repositorioUser.twitter
                  : "Sem twitter"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ margin: "12px" }}
              >
                <BusinessIcon sx={{ marginRight: "3px" }} />
                {repositorioUser.nomeEmpresa &&
                repositorioUser.nomeEmpresa !== null
                  ? repositorioUser.nomeEmpresa
                  : "Sem empresa"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ margin: "12px" }}
              >
                <WebIcon sx={{ marginRight: "3px" }} />
                {repositorioUser.website && repositorioUser.website !== null
                  ? repositorioUser.website
                  : "Sem website"}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
