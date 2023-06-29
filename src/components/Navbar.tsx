import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="text-2xl py-4 flex justify-between">
      <Link href="/">Batwaara</Link>
      <div className="flex gap-4">
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link className="hover:underline" href="/sign-in">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
