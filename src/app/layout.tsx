import "@/app/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import {Providers} from "./providers";
import { variable } from "@/components/font/fontProvider";

export const metadata: Metadata = {
  title: "spookify",
  description: "Get ready for halloween with our AI Powered Picture Editing Tools"
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
    <head />
    <body
      className={clsx(
        "min-h-screen bg-none font-sans antialiased font-normal", variable.className
      )}
    >
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="relative flex flex-col h-screen items-center">
        <div className="fixed w-screen z-[1] h-screen bg-[url('/dark-bg.png')] top-0 opacity-30 bg-[length:1950px_1080px] bg-center bg-no-repeat"></div>
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow z-10">
            {children}
          </main>
        </div>
      </Providers>
    </body>
  </html>
);
}
