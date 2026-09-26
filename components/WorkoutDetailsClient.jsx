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
    <div className="flex flex-wrap gap-4">
      <button
        onClick={handleAddToPlan}
        className="flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:opacity-90"
      >
        <span>Add to Today's Plan</span>
      </button>

      <button
        onClick={handleAddToSaved}
        className="flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:bg-zinc-900"
      >
        <span>Save for Later</span>
      </button>
    </div>
  );
}