import "../globals.css";

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
    <main className="min-h-screen flex justify-center items-center">
      {children}
    </main>
  );
}
