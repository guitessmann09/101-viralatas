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

    const resultado = await prisma.coleta.updateMany({
      where: {
        id,
        status: "RESERVADA",
        voluntarioId: body.voluntarioId,
      },
      data: {
        status: "CONCLUIDA",
        dataConclusao: new Date(),
      },
    });

    if (resultado.count === 0) {
      return NextResponse.json(
        {
          erro:
            "Coleta não encontrada ou não reservada por esse voluntário.",
        },
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

    return NextResponse.json({
      mensagem: "Coleta concluída com sucesso.",
      coleta,
    });
  } catch (error) {
    console.error("Erro ao concluir coleta:", error);

    return NextResponse.json(
      { erro: "Não foi possível concluir a coleta." },
      { status: 500 }
    );
  }
}