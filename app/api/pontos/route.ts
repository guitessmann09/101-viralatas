import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const pontos = await prisma.pontoColeta.findMany();

    return NextResponse.json(pontos);
  } catch (error) {
    console.error("Erro ao buscar pontos:", error);

    return NextResponse.json(
      { erro: "Erro ao buscar pontos de coleta" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
  !body.nome?.trim() ||
  !body.endereco?.trim() ||
  !body.cidade?.trim()
) {
  return NextResponse.json(
    {
      erro: "Nome, endereço e cidade são obrigatórios.",
    },
    { status: 400 }
  );
}

    const ponto = await prisma.pontoColeta.create({
      data: {
        nome: body.nome,
        telefone: body.telefone || null,
        endereco: body.endereco,
        numero: body.numero || null,
        bairro: body.bairro || null,
        cidade: body.cidade,
        cep: body.cep || null,
        latitude: body.latitude ?? null,
        longitude: body.longitude ?? null,
      },
    });

    return NextResponse.json(ponto, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar ponto:", error);
    console.error("Detalhes do erro:", error);

    return NextResponse.json(
      { erro: "Não foi possível cadastrar o ponto." },
      { status: 500 }
    );
  }
}

