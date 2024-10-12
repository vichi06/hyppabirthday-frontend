import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import ClientWrapper from "./components/ClientWrapper";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hyppabirthday",
  description: "Des cadeaux numériques inoubliables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
