import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { allowedUsers } from "@/utils/allowed-users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (
        typeof profile?.email === "string" &&
        allowedUsers.includes(profile.email)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
});
