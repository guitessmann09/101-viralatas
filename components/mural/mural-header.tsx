import { HandHeart } from "lucide-react";

export function MuralHeader() {
  return (
    <header className="space-y-2">
      <div className="flex items-center gap-2">
        <HandHeart className="h-7 w-7" />
        <h1 className="text-2xl font-bold">Mural do Voluntário</h1>
      </div>
      <p className="text-sm text-muted-foreground">
        Confira os pontos que precisam de recolhimento e escolha uma coleta para ajudar.
      </p>
    </header>
  );
}
