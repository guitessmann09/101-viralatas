import "dotenv/config";
import { prisma } from "./prisma";

async function main() {
  const pontos = await prisma.pontoColeta.findMany();

  console.log("Pontos de coleta encontrados:", pontos.length);
  console.log(pontos);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
