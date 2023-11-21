import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import usuarioLogadoContext from "../../shared/contexts";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/usuario";

const loginUserFormSchema = z.object({
  email: z.string().email("E-mail inválido!"),
  password: z.string().min(5, "A senha precisa de no mínimo 5 caracteres"),
  usuarioGitHub: z
    .string()
    .min(3, "O nome de usuário do GitHub precisa de no mínimo 3 caracteres"),
});

type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { usuario, setUsuario } = usuarioLogadoContext();

  const handleLogin = async () => {
    const usuario = await login(email, password);
    const tokenValido = usuario?.token;

    sessionStorage.setItem("token", tokenValido);

    setUsuario(usuario);

    navigate("/pesquisa");
  };

  const handleForgotPass = () => {
    navigate("/forgotpass");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 bg-zinc-200">
      <div className="flex h-90 w-96 flex-col items-center justify-evenly rounded-lg border bg-zinc-100 p-6 shadow-xl">
        <label className="m-5 text-4xl font-semibold">Login</label>

        <form className="flex w-full max-w-sm flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xl font-semibold">E-mail</label>
            <TextField
              fullWidth
              placeholder="exemplo@mail.com"
              {...register("email")}
              type="text"
              onBlur={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="text-base text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xl font-semibold">Senha</label>
            <TextField
              fullWidth
              placeholder="Senha"
              type="password"
              {...register("password")}
              onBlur={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="text-base text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
        </form>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <button
          onClick={handleLogin}
          className="h-12 w-full max-w-sm rounded-lg bg-blue-700 text-xl font-semibold text-white shadow-lg hover:bg-blue-800"
        >
          Entrar
        </button>
        <button
          onClick={handleForgotPass}
          className="font-medium text-blue-700 underline hover:text-blue-900"
        >
          Esqueci minha senha
        </button>
      </div>
    </main>
  );
};
