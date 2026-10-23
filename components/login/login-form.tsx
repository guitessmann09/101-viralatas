import Link from "next/link";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { createUser } from "@/app/_actions/create-user";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: LoginFormProps) {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    // await createUser(email, password);
  };
  return (
    <section className="flex items-center justify-center bg-background/80 p-6 sm:p-8">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="mt-1 text-3xl font-bold text-foreground">
            Acessar Dashboard ONG
          </h2>
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="seu@email.com"
                className="h-12 rounded-xl border-border/80 bg-background pl-10 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Senha
              </label>
              <Link
                href="#"
                className="text-xs font-medium text-primary hover:underline"
              >
                Esqueci a senha
              </Link>
            </div>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl border-border/80 bg-background pl-10 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Manter conectado</span>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 accent-primary"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-xl text-base font-semibold"
          >
            Entrar no painel
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
