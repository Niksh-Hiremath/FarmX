"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Unknown error";

  return (
    <div className="flex flex-col items-center justify-center h-full text-2xl space-y-2 pt-4">
      <h1 className="text-4xl">Error</h1>
      <p>Sorry, something went wrong</p>
      <p className="text-red-600">{error}</p>
    </div>
  );
}
