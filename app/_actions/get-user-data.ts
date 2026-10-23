import { prisma } from "@/lib/prisma";
import { Session } from "better-auth";

export interface UserData {
  id: string;
  nome: string;
  image: string | null;
  email: string;
}

export const getUserData = async (
  session: Session,
): Promise<UserData | undefined> => {
  if (!session || !session.userId) {
    throw new Error("Usuário não autenticado.");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      nome: true,
      image: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return {
    id: user.id,
    nome: user.nome,
    image: user.image || null,
    email: user.email,
  };
};
