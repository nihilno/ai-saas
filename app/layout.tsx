import Providers from "@/components/global/providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Nexletter",
    default: "Dashboard | Nexletter",
  },
  description: "Nexletter built with Next.js and OpenAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "flex min-h-dvh flex-col antialiased")}
      >
        <Providers>
          <section className="flex-1">{children}</section>
        </Providers>
      </body>
    </html>
  );
}
