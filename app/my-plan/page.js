"use client";

import { useMemo, useState, useEffect, Suspense } from "react"; 
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { toast } from "react-toastify";
import { LuChevronDown } from "react-icons/lu";

function PlanContent() {
  const { plan, saved, removeFromPlan, removeFromSaved } = useWorkout();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [searchParams]);

  const workouts = activeTab === "plan" ? [...plan] : [...saved];

  workouts.sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const totalExercises = plan.length;

  const totalMinutes = useMemo(
    () => plan.reduce((sum, item) => sum + item.duration, 0),
    [plan]
  );

  const totalCalories = useMemo(
    () => plan.reduce((sum, item) => sum + item.caloriesBurned, 0),
    [plan]
  );

  const handleRemove = (id) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      toast.info("Removed from today's plan");
    } else {
      removeFromSaved(id);
      toast.info("Removed from saved");
    }
  };

  const handleDone = (id) => {
    removeFromPlan(id);
    toast.success("Workout completed");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-black uppercase tracking-tight">MY PLAN</h1>
      <p className="mt-2 text-zinc-500 text-sm">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 border border-zinc-900 rounded-3xl bg-[#131416] p-8 flex flex-col justify-around gap-6 cursor-pointer sm:flex-row text-left sm:items-center">
        <div className="flex-1 sm:border-r cursor-pointer border-zinc-800 py-2 sm:px-6">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Exercises</p>
          <h2 className="mt-1 text-5xl font-black text-[#ccff00]">{totalExercises}</h2>
        </div>

        <div className="flex-1 sm:border-r cursor-pointer border-zinc-800 py-2 sm:px-6">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Minutes</p>
          <h2 className="mt-1 text-5xl font-black text-white">{totalMinutes}</h2>
        </div>

        <div className="flex-1 py-2 cursor-pointer sm:px-6">
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Calories</p>
          <h2 className="mt-1 text-5xl font-black text-white">{totalCalories}</h2>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-full bg-[#131416] p-1 border border-zinc-900 max-w-xs">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "plan"
                ? "bg-zinc-800 text-[#ccff00]"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "saved"
                ? "bg-zinc-800 text-[#ccff00]"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center cursor-pointer gap-2 text-xs text-zinc-500 font-bold uppercase tracking-wider">
          <span>Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#131416] border border-zinc-800 cursor-pointer rounded-lg pl-3 pr-8 py-2 text-white font-medium focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <LuChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          </div>
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-zinc-900 bg-[#131416] py-24 text-center">
          <h2 className="text-2xl font-black uppercase text-white tracking-wide">
            NOTHING HERE YET
          </h2>
          <p className="mt-3 text-zinc-500 text-sm max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="rounded-3xl bg-[#131416] border border-zinc-900 p-5 transition hover:border-zinc-800"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-24 w-full rounded-2xl object-cover sm:w-36 bg-zinc-900"
                />

                <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black uppercase text-white tracking-wide">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 border-t border-zinc-800/60 pt-2.5 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">⏱️ {workout.duration} min</span>
                      <span className="flex items-center gap-1">🔥 {workout.caloriesBurned} kcal</span>
                      <span className="flex items-center gap-1 text-[#ccff00]">⭐ {workout.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full border border-zinc-800 px-5 py-2 text-sm font-normal text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => handleDone(workout.id)}
                        className="flex items-center gap-1 rounded-full bg-[#ccff00] px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90 cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span>Mark as Done</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleRemove(workout.id)}
                      className="text-zinc-600 transition hover:text-red-400 cursor-pointer text-2xl sm:text-3xl p-1 ml-1 leading-none font-light flex items-center justify-center h-8 w-8"
                      aria-label={`Remove ${workout.name}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </div>
    }>
      <PlanContent />
    </Suspense>
  );
}
