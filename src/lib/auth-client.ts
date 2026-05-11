import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined"
    ? `${window.location.origin}/api/v1/auth`
    : (process.env.NEXT_PUBLIC_AUTH_URL || (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/auth` : "https://chaka-ride-server.vercel.app/api/v1/auth")),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "PASSENGER",
      },
    },
  },
});

export const { signIn, signUp, signOut, useSession } = authClient;
