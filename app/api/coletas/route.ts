import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: listar coletas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const statusPermitidos = [
      "DISPONIVEL",
      "RESERVADA",
      "CONCLUIDA",
    ];

    if (status && !statusPermitidos.includes(status)) {
      return NextResponse.json(
        { erro: "Status inválido." },
        { status: 400 }
      );
    }

    const coletas = await prisma.coleta.findMany({
      where: status ? { status } : undefined,
      include: {
        pontoColeta: true,
        voluntario: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(coletas);
  } catch (error) {
    console.error("Erro ao listar coletas:", error);

    return NextResponse.json(
      { erro: "Erro ao listar coletas." },
      { status: 500 }
    );
  }
}

// POST: cadastrar uma coleta
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.pontoColetaId?.trim()) {
      return NextResponse.json(
        { erro: "O ponto de coleta é obrigatório." },
        { status: 400 }
      );
    }

    const ponto = await prisma.pontoColeta.findUnique({
      where: { id: body.pontoColetaId },
    });

    if (!ponto) {
      return NextResponse.json(
        { erro: "Ponto de coleta não encontrado." },
        { status: 404 }
      );
    }

    const coleta = await prisma.coleta.create({
      data: {
        pontoColetaId: body.pontoColetaId,
        status: "DISPONIVEL",
      },
      include: {
        pontoColeta: true,
        voluntario: true,
      },
    });

    return NextResponse.json(coleta, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar coleta:", error);

    return NextResponse.json(
      { erro: "Erro ao cadastrar coleta." },
      { status: 500 }
    );
  }
}