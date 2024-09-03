"use server";

import { signIn } from "./authConfig";

export const handleGoogleSignIn = async () => {
  try {
    console.log(process.env.GOOGLE_CLIENT_SECRET);
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    throw error;
  }
};
