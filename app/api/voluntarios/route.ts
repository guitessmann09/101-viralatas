import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: listar voluntários
export async function GET() {
  try {
    const voluntarios = await prisma.voluntario.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(voluntarios);
  } catch (error) {
    console.error("Erro ao listar voluntários:", error);

    return NextResponse.json(
      { erro: "Erro ao listar voluntários." },
      { status: 500 }
    );
  }
}

// POST: cadastrar voluntário
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.nome?.trim() || !body.telefone?.trim()) {
      return NextResponse.json(
        { erro: "Nome e telefone são obrigatórios." },
        { status: 400 }
      );
    }

    const voluntario = await prisma.voluntario.create({
      data: {
        nome: body.nome.trim(),
        telefone: body.telefone.trim(),
        email: body.email?.trim() || null,
      },
    });

    return NextResponse.json(voluntario, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar voluntário:", error);

    return NextResponse.json(
      { erro: "Erro ao cadastrar voluntário." },
      { status: 500 }
    );
  }
}