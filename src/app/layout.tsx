import { Metadata, ResolvingMetadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const spaceGrotesk = localFont({
  src: [
    {
      path: "/fonts/SpaceGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/SpaceGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/SpaceGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/SpaceGrotesk-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
});

const reader = createReader(process.cwd(), keystaticConfig);

export async function generateMetadata() {
  const home = await reader.singletons.home.readOrThrow();

  return {
    title: home.title,
    description: home.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
