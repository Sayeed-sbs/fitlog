"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { toast } from "react-toastify";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const workouts = activeTab === "plan" ? [...plan] : [...saved];

  workouts.sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  const totalExercises = plan.length;

  const totalMinutes = useMemo(() => {
    return plan.reduce((sum, item) => sum + item.duration, 0);
  }, [plan]);

  const totalCalories = useMemo(() => {
    return plan.reduce(
      (sum, item) => sum + item.caloriesBurned,
      0
    );
  }, [plan]);

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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black uppercase">
        MY PLAN
      </h1>

      <p className="mt-2 text-zinc-400">
        Cap of five lifts for today. Finish them,
        then load more.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-[#131416] p-6">
          <p className="text-sm text-zinc-500">
            Exercises
          </p>
          <h2 className="mt-2 text-5xl font-black text-[#ccff00]">
            {totalExercises}
          </h2>
        </div>

        <div className="rounded-3xl bg-[#131416] p-6">
          <p className="text-sm text-zinc-500">
            Minutes
          </p>
          <h2 className="mt-2 text-5xl font-black">
            {totalMinutes}
          </h2>
        </div>

        <div className="rounded-3xl bg-[#131416] p-6">
          <p className="text-sm text-zinc-500">
            Calories
          </p>
          <h2 className="mt-2 text-5xl font-black">
            {totalCalories}
          </h2>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex rounded-full bg-[#131416] p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 text-sm ${
              activeTab === "plan"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 text-sm ${
              activeTab === "saved"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500"
            }`}
          >
            Saved
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="select select-bordered bg-[#131416]"
        >
          <option value="duration">
            Duration
          </option>
          <option value="calories">
            Calories
          </option>
          <option value="rating">
            Rating
          </option>
        </select>
      </div>

      {workouts.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-zinc-800 py-24 text-center">
          <h2 className="text-2xl font-black uppercase">
            NOTHING HERE YET
          </h2>

          <p className="mt-3 text-zinc-500">
            Browse the library and add a lift to
            get today moving.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="rounded-3xl bg-[#131416] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-bold uppercase">
                    {workout.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {workout.equipment}
                  </p>

                  <div className="mt-2 flex gap-4 text-sm text-zinc-500">
                    <span>
                      {workout.duration} min
                    </span>

                    <span>
                      {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      ⭐ {workout.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-zinc-700 px-5 py-2"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() =>
                        handleDone(workout.id)
                      }
                      className="rounded-full bg-[#ccff00] px-5 py-2 font-bold text-black"
                    >
                      Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleRemove(workout.id)
                    }
                    className="rounded-full border border-red-900 px-5 py-2 text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}