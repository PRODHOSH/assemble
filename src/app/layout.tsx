import type { Metadata } from "next";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assemble — Find Teammates. Build Together.",
  description:
    "Assemble is a remote-first platform where builders pitch projects, recruit teammates through structured applications, and automatically get a collaboration workspace when the team is complete.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
