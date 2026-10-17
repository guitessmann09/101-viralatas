"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LoginBrandPanel } from "@/components/login/login-brand-panel";
import { LoginForm } from "@/components/login/login-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@101viralatas.org");
  const [password, setPassword] = useState("123456");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.16),transparent_35%),linear-gradient(135deg,var(--background),var(--muted))] p-4">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-border/80 bg-card/80 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.7)] backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <LoginBrandPanel />
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
