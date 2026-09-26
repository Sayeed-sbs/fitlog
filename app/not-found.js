import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-[#0c0d0e]">
      <h1 className="text-7xl font-black text-[#ccff00] uppercase tracking-wider mb-2">
        404
      </h1>
      <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-4">
        PAGE NOT FOUND
      </h2>
      <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-8">
        The page you are looking for doesn't exist. Head back to the home page to get moving.
      </p>
      <Link 
        href="/" 
        className="rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
      >
        GO TO WORKOUTS
      </Link>
    </div>
  );
}
