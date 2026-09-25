"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar({ planCount = 0, savedCount = 0 }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/assets/logo.png" 
            alt="FitLog Logo" 
            width={28} 
            height={28} 
            className="object-contain"
            priority 
          />
          <span className="text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm transition ${
              pathname === "/"
                ? "bg-zinc-800 text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-sm transition ${
              pathname === "/my-plan"
                ? "bg-zinc-800 text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
          >
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-[#ccff00]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-transparent px-4 py-2 text-sm text-gray-300"
          >
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-xs text-gray-400 border border-zinc-700">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
