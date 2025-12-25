"use client";

import { Button } from "@/components/ui/button";
import { Home, RotateCw, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NotFound() {
  const { refresh } = useRouter();

  return (
    <section className="grid min-h-dvh place-items-center">
      <div className="flex flex-col items-center justify-center text-center">
        <XCircle className="text-primary mb-4 size-14 animate-pulse" />
        <h2 className="mb-2 text-2xl font-semibold">Page not found</h2>
        <p className="mt-4 max-w-sm text-sm opacity-60">
          The page you&apos;re chasing has wandered off or curled up for a nap.
          Try giving it a refresh, or go back home
        </p>
        <div className="mt-8 space-x-4">
          <Button onClick={() => refresh()} variant="outline">
            <RotateCw /> <span>Reload</span>
          </Button>
          <Link href="/dashboard">
            <Button variant={"secondary"}>
              <Home /> <span>Go Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
