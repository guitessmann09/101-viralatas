import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.voluntarioId?.trim()) {
      return NextResponse.json(
        { erro: "O ID do voluntário é obrigatório." },
        { status: 400 }
      );
    }

    const voluntario = await prisma.voluntario.findUnique({
      where: { id: body.voluntarioId },
    });

    if (!voluntario) {
      return NextResponse.json(
        { erro: "Voluntário não encontrado." },
        { status: 404 }
      );
    }

    const resultado = await prisma.coleta.updateMany({
      where: {
        id,
        status: "DISPONIVEL",
        voluntarioId: null,
      },
      data: {
        voluntarioId: body.voluntarioId,
        status: "RESERVADA",
        dataReserva: new Date(),
      },
    });

    if (resultado.count === 0) {
      return NextResponse.json(
        { erro: "Coleta não encontrada ou já reservada." },
        { status: 409 }
      );
    }

    const coleta = await prisma.coleta.findUnique({
      where: { id },
      include: {
        pontoColeta: true,
        voluntario: true,
      },
    });

    return NextResponse.json(coleta);
  } catch (error) {
    console.error("Erro ao reservar coleta:", error);

    return NextResponse.json(
      { erro: "Não foi possível reservar a coleta." },
      { status: 500 }
    );
  }
}