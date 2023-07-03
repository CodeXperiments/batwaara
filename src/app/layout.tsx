import "./globals.css";
import { Atkinson_Hyperlegible } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toast/toaster";
import Navbar from "@/components/Navbar";

const font = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Batwaara | Home",
  description: "Money splitting done right!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`container ${font.className}`}>
          <Navbar/>
          {children}
          <footer className="flex justify-center items-center">Batwaara 2023</footer>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
