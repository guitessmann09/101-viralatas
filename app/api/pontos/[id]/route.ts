import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ponto = await prisma.pontoColeta.findUnique({
      where: { id },
    });

    if (!ponto) {
      return NextResponse.json(
        { erro: "Ponto de coleta não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(ponto);
  } catch (error) {
    console.error("Erro ao buscar ponto:", error);

    return NextResponse.json(
      { erro: "Erro ao buscar ponto de coleta." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (
      !body.nome?.trim() ||
      !body.endereco?.trim() ||
      !body.cidade?.trim()
    ) {
      return NextResponse.json(
        { erro: "Nome, endereço e cidade são obrigatórios." },
        { status: 400 }
      );
    }

    const pontoExistente = await prisma.pontoColeta.findUnique({
      where: { id },
    });

    if (!pontoExistente) {
      return NextResponse.json(
        { erro: "Ponto de coleta não encontrado." },
        { status: 404 }
      );
    }

    const pontoAtualizado = await prisma.pontoColeta.update({
      where: { id },
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

    return NextResponse.json(pontoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar ponto:", error);

    return NextResponse.json(
      { erro: "Não foi possível atualizar o ponto." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ponto = await prisma.pontoColeta.findUnique({
      where: { id },
    });

    if (!ponto) {
      return NextResponse.json(
        { erro: "Ponto de coleta não encontrado." },
        { status: 404 }
      );
    }

    await prisma.pontoColeta.delete({
      where: { id },
    });

    return NextResponse.json({
      mensagem: "Ponto de coleta excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir ponto:", error);

    return NextResponse.json(
      { erro: "Não foi possível excluir o ponto de coleta." },
      { status: 500 }
    );
  }
}
