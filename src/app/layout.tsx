import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "SkyTracker",
  description:
    "SkyTracker: Your Gateway to Real-Time Weather Updates and Forecasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
