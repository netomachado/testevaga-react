import { useState } from "react";
import { Divider, TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const forgotPassSchema = z.object({
  email: z.string().email("E-mail inválido!"),
});

type ForgotPassData = z.infer<typeof forgotPassSchema>;

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleEnviar = () => {
    navigate("/login");
  };

  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassData>({
    resolver: zodResolver(forgotPassSchema),
  });

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 bg-zinc-200">
      <div className="flex h-2/4 w-3/5 flex-col items-center justify-around rounded-lg border bg-zinc-100 p-6 shadow-xl">
        <div className="flex w-full flex-1 flex-col items-center justify-around gap-4">
          <label className="flex flex-col text-3xl font-semibold">
            Recuperação de senha
          </label>

          <label className="flex flex-col justify-center gap-6 text-center text-lg font-normal text-zinc-950">
            <Divider variant="middle" />
            Para recuperar sua senha, informe seu endereço de e-mail.
            <br />
            Nós enviaremos um link com as instruções necessárias para alterar
            sua senha.
          </label>
          <form className="flex w-full max-w-lg flex-col gap-6">
            <div className="flex flex-col gap-1 p-2">
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
          </form>
        </div>
      </div>
      <button
        onClick={handleSubmit(handleEnviar)}
        type="submit"
        className="h-14 w-full max-w-sm rounded-lg bg-blue-700 text-2xl font-semibold text-white shadow-lg hover:bg-blue-800"
      >
        Enviar
      </button>
    </main>
  );
};
