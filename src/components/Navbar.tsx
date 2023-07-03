"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const { isSignedIn } = useUser();
  const path = usePathname();

  if (path.startsWith("/sign-in") || path.startsWith("/sign-up")||isSignedIn===undefined) return null;

  return (
    <nav className="text-2xl py-4 flex justify-between items-center">
      <Link href="/">Batwaara</Link>
      <div className="flex gap-4">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button asChild>
            <Link className="hover:underline" href="/sign-in">
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
 