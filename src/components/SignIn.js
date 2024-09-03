"use client";

import { handleGoogleSignIn } from "@/lib/auth/googleSignIn";

export function SignIn() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center w-1/4 shadow-lg p-8 border border-solid border-gray-100">
        <h1 className="pb-2">B&B Save Money</h1>

        <button className="p-2" onClick={() => handleGoogleSignIn("google")}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
