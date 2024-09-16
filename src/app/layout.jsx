import { StateProvider } from "@/store";
import { SessionProvider } from "next-auth/react";
import { Jersey_10 } from "next/font/google";
import "./globals.css";

const jersey10 = Jersey_10({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "B&B Eats Budget",
  description: "I like that you like to eat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <StateProvider>
          <body className={jersey10.className}>{children}</body>
        </StateProvider>
      </SessionProvider>
    </html>
  );
}
