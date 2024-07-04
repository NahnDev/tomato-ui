import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import RecoilRootWrapper from "@/state/RecoilRootWrapper";
config.autoAddCss = false;

import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { HotkeysProvider } from "react-hotkeys-hook";
import { AppNavbar } from "@/components/AppNavbar";
import clsx from "clsx";
import { Suspense } from "react";
import PageLoading from "@/components/share/PageLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tomato UI",
  description: "Generated your ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx([inter.className, "text-slate-700"])}>
        <RecoilRootWrapper>
          <div className="w-screen h-screen overflow-hidden grid grid-rows-[auto_1fr]">
            <AppNavbar />
            {children}
          </div>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
