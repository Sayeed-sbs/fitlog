import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="bg-[#0c0d0e] px-4 py-12">
      <div className="mx-auto max-w-7xl rounded-3xl bg-[#131416] p-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest text-[#ccff00] uppercase mb-4">
            WORKOUT LIBRARY
          </p>
          
          <h1 className="text-4xl md:text-[56px] font-extrabold tracking-tight text-white uppercase leading-tight mb-6 font-[family-name:var(--font-oswald)]">
            TRAIN WITH INTENT. LOG <br />EVERY SET.
          </h1>
          
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
            into today's plan, and watch the week's work add up.
          </p>
          
          <a 
            href="#library" 
            className="inline-flex items-center gap-2 rounded-lg bg-[#ccff00] px-8 py-4.5 text-sm font-bold text-black transition hover:opacity-90"
          >
            <span>BROWSE WORKOUTS</span>
            <LuArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full">
          <Image 
            src="/assets/banner.png" 
            alt="Workout Illustration" 
            width={450} 
            height={450} 
            className="object-contain w-full h-auto max-h-[400px]"
            priority
          />
        </div>

      </div>
    </section>
  );
}
