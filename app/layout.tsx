import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  return {
    title: "Petshop.ru — прототип новой главной",
    description: "Десктопный и мобильный прототип новой главной Petshop.ru",
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title: "Petshop.ru — прототип новой главной",
      description: "Облегчённая главная для десктопа и iPhone 17 Pro",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1729, height: 910 }],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
