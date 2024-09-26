import Link from "next/link";

export default function LeftRoom({ id }: { id: string }) {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">You left the room</h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={`/room/${id}`}
            className="rounded-md border border-zinc-200 text-gray-900 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Rejoin
          </Link>
          <Link
            href="/"
            className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
