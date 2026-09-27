"use client";
 
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
 
 
export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();
 
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-3 sm:px-4">
 
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image 
            src="/assets/logo.png" 
            alt="FitLog Logo" 
            width={28} 
            height={28} 
            className="object-contain"
            priority 
          />
          <span className="text-lg sm:text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>
 
        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition ${
              pathname === "/"
                ? "bg-zinc-800 text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
 
          <Link
            href="/my-plan"
            className={`rounded-full px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition ${
              pathname === "/my-plan"
                ? "bg-zinc-800 text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
 
        <div className="flex items-center gap-2 sm:gap-3 sm:pl-3 sm:border-l sm:border-zinc-800">
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#ccff00] px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-black"
          >
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-[#ccff00]">
              {plan.length}
            </span>
          </Link>
 
          <Link
            href="/my-plan?tab=saved"
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-zinc-700 bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300"
          >
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-xs text-gray-400 border border-zinc-700">
              {saved.length}
            </span>
          </Link>
        </div>
 
      </div>
    </nav>
  );
}