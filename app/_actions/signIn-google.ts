import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();
export const signInGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
