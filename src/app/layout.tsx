import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rhythmic Circles",
  description: "See the rhythmic possibilities!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-blue-300">
          <h1 className="text-4xl mb-4">Rhythmic Circle Generator</h1>
        </header>
        <main className="p-8">{children}</main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          By Russell for Steffen
        </footer>
      </body>
    </html>
  );
}
