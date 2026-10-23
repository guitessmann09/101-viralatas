"use client";

import { useState } from "react";

import { LoginBrandPanel } from "@/components/login/login-brand-panel";
import { LoginForm } from "@/components/login/login-form";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signInGoogle } from "../_actions/signIn-google";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    signInGoogle();
  };

  return (
    <main className="grid w-full h-full lg:grid-cols-[1.2fr_0.8fr]">
      <ThemeProvider defaultTheme="light" storageKey="viralatas-theme">
        <div className="absolute right-4 top-4 z-50 hidden items-center gap-4 sm:flex">
          <ThemeToggle />
        </div>
      </ThemeProvider>
      <LoginBrandPanel />
      <div className="flex my-auto flex-col items-center justify-center bg-background/80 p-6 sm:p-8">
        <Tabs defaultValue="login" className="w-4/5 h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Administrador ONG</TabsTrigger>
            <TabsTrigger value="volunteer">Voluntário</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
            />
          </TabsContent>
          <TabsContent value="volunteer">
            <div className="space-y-5">
              <h2 className="mt-1 text-3xl font-bold text-foreground">
                Seja um voluntário e ajude a salvar vidas!
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Cadastre-se como voluntário e faça a diferença na vida dos
                animais.
              </p>
              <Button
                onClick={handleLoginWithGoogle}
                className="w-full p-5 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div>
                    <Spinner width={5} height={5} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Image
                      src="/google-icon.svg"
                      alt="Google"
                      width={20}
                      height={20}
                    />
                    <span>Faça login com Google</span>
                  </div>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
