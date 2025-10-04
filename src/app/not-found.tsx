import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Not Found</h2>
      <p className="mb-6 max-w-md text-center">
        Could not find the requested resource
      </p>
      <Link href="/" className="transition hover:text-teal-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
