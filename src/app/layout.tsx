import Link from "next/link";
import "./globals.css";
import { Atkinson_Hyperlegible } from "next/font/google";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const inter = Atkinson_Hyperlegible({
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
        <body className={`px-5 ${inter.className}`}>
          <Navbar/>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
