import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: consultar um voluntário pelo ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const voluntario = await prisma.user.findUnique({
      where: { id },
    });

    if (!voluntario) {
      return NextResponse.json(
        { erro: "Voluntário não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(voluntario);
  } catch (error) {
    console.error("Erro ao buscar voluntário:", error);

    return NextResponse.json(
      { erro: "Erro ao buscar voluntário." },
      { status: 500 },
    );
  }
}

// PUT: atualizar um voluntário
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.nome?.trim() || !body.telefone?.trim()) {
      return NextResponse.json(
        { erro: "Nome e telefone são obrigatórios." },
        { status: 400 },
      );
    }

    const existente = await prisma.user.findUnique({
      where: { id },
    });

    if (!existente) {
      return NextResponse.json(
        { erro: "Voluntário não encontrado." },
        { status: 404 },
      );
    }

    const voluntario = await prisma.user.update({
      where: { id },
      data: {
        nome: body.nome.trim(),
        telefone: body.telefone.trim(),
        email: body.email?.trim() || null,
      },
    });

    return NextResponse.json(voluntario);
  } catch (error) {
    console.error("Erro ao atualizar voluntário:", error);

    return NextResponse.json(
      { erro: "Erro ao atualizar voluntário." },
      { status: 500 },
    );
  }
}

// DELETE: excluir um voluntário
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existente = await prisma.user.findUnique({
      where: { id },
    });

    if (!existente) {
      return NextResponse.json(
        { erro: "Voluntário não encontrado." },
        { status: 404 },
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      mensagem: "Voluntário excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir voluntário:", error);

    return NextResponse.json(
      { erro: "Erro ao excluir voluntário." },
      { status: 500 },
    );
  }
}
