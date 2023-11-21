import { Navigate, Route, Routes } from 'react-router-dom';
import { Cadastrar } from '../pages/Cadastrar';
import { Login } from '../pages/Login';
import { ForgotPassword } from '../pages/Login/forgotPassword';
import { Pesquisa } from '../pages/Pesquisa';
import { Historico } from '../pages/Historico';
import { Repositorios } from '../pages/Repositorios';
import { Usuario } from '../pages/Usuario';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastrar" />} />
      <Route path="/cadastrar" element={<Cadastrar/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgotpass" element={<ForgotPassword />} />
      <Route path="/pesquisa" element={<Pesquisa />} />
      <Route path="/repositorios/:nome" element={<Repositorios />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/usuario" element={<Usuario />} />

      <Route path="/404" element={<div>404 - Pagina não encontrada</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}