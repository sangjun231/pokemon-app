import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Link from "next/link";
import QueryProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Pokemon App",
  description: "display Pokemon information",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col items-center`}>
        <nav>
          <h1>Welcome to the Pokemon App</h1>
          <Link href="/">Home</Link>
          <Link href="/pokemonList">포켓몬 도감</Link>
        </nav>
        <main className="flex items-center justify-center w-full h-full max-w-4xl">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <footer>
          <p>© 2024 Pokemon App</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
