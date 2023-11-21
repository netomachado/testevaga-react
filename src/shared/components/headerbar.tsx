import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import usuarioLogadoContext from "../../shared/contexts";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const usuario = usuarioLogadoContext();
  const navigate = useNavigate();

  const handleUserPage = () => {
    navigate(`/usuario`);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ margin: "10px" }}
            onClick={handleUserPage}
          >
            {usuario.usuario.username
              ? usuario.usuario.username
              : "nome usuario"}
          </Typography>
          <div>
            <Tooltip title="Avatar">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={`${usuario.usuario.avatar}`} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
