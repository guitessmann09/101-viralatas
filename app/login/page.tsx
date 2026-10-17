"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LoginBrandPanel } from "@/components/login/login-brand-panel";
import { LoginForm } from "@/components/login/login-form";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <main className="grid w-full h-full lg:grid-cols-[1.1fr_0.9fr]">
      <ThemeProvider defaultTheme="light" storageKey="viralatas-theme">
        <div className="absolute right-4 top-4 z-50 hidden items-center gap-4 sm:flex">
          <ThemeToggle />
        </div>
      </ThemeProvider>
      <LoginBrandPanel />
      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
