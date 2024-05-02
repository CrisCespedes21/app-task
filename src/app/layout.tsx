import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Lista } from "@/components/navbar/Lista";
import { Header } from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Task",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="border w-64 h-full">
            <Lista />
          </div>
          <div className="flex-auto w-2/3 p-0 h-full mx-auto max-w-screen-xl">
            <Header />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
