import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black py-8 mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/assets/logo.png" 
            alt="FitLog Logo" 
            width={24} 
            height={24} 
            className="object-contain"
          />
          <span className="text-xl font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        <p className="text-sm text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
