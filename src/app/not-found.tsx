"use client";

import Link from "next/link";

/**
 * Fallback when no locale segment applies (e.g. unmatched static files edge cases).
 * Normal 404s for `/en/...` and `/bn/...` use `app/[locale]/not-found.tsx`.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 font-sans text-slate-900">
        <h1 className="text-xl font-semibold">Page not found</h1>
        <Link href="/en" className="text-(--brand-primary) underline">
          Go to home (English)
        </Link>
      </body>
    </html>
  );
}
