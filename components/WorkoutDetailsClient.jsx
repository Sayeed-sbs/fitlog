"use client";

import { useWorkout } from "@/context/WorkoutContext";
import { toast } from "react-toastify";

export default function WorkoutDetailsClient({ workout }) {
  const { addToPlan, addToSaved } = useWorkout();

  const handleAddToPlan = () => {
    const result = addToPlan(workout);

    if (result === true) {
      toast.success("Added to today's plan");
    } else if (result === false) {
      toast.warning("Workout already in plan");
    } else if (result === "limit") {
      toast.error("Maximum 5 workouts allowed");
    }
  };

  const handleAddToSaved = () => {
    const result = addToSaved(workout);

    if (result === true) {
      toast.success("Saved for later");
    } else {
      toast.warning("Workout already saved");
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4 font-sans">
      
      <button
        onClick={handleAddToPlan}
        className="flex items-center gap-2 rounded-lg bg-[#ccff00] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 cursor-pointer tracking-normal normal-case"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
        <span>Add to today's plan</span>
      </button>

      <button
        onClick={handleAddToSaved}
        className="flex items-center gap-2 rounded-lg border border-zinc-850 bg-[#131416]/50 px-5 py-2.5 text-sm font-normal text-zinc-300 transition hover:bg-zinc-900 cursor-pointer tracking-normal normal-case"
      >
        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
        <span>Save for later</span>
      </button>

    </div>
  );
}
