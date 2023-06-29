import Link from "next/link";
import "./globals.css";
import { Atkinson_Hyperlegible } from "next/font/google";
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";

const inter = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Batwaara",
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
          <nav className="text-2xl py-4">
            <ul className="flex justify-between">
              <li>Batwaara</li>
              <li>
                <>
                <UserButton afterSignOutUrl="/"/>
                <Link className="hover:underline" href="/sign-in">
                  Sign In
                </Link>
                </>
              </li>
            </ul>
          </nav>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
