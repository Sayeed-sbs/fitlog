"use client";

import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      
      <div id="library" className="bg-[#0c0d0e] max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">THE LIBRARY</h2>
        <p className="text-zinc-400 text-sm mb-8">Twelve lifts covering every major muscle group.</p>
        
        
      </div>
    </div>
  );
}
