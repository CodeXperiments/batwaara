export const metadata = {
  title: "Batwaara | Demo",
  description: "Money splitting done right!",
};
export const runtime = 'edge' 
export default async function Demo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl font-bold'>Demo Protected Page</h1>
    </main>
  )
}
