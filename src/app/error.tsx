"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">
        We couldn&apos;t catch this Pokémon data, or there was an error with the
        PokéAPI.
      </p>
      <Button onClick={reset} className="cursor-pointer">
        Try again
      </Button>
    </div>
  );
}
