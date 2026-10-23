import { authClient } from "@/lib/auth-client";


export const createUser = async (email: string, password: string) => {
  await authClient.signUp.email(
    {
      email,
      password,
      name: "teste",
    },
    {
      onSuccess: (data) => {
        console.log("Usuário criado com sucesso:", data);
      },
      onError: (error) => {
        console.error("Erro ao criar usuário:", error);
      },
    },
  );
};
