import { getWorkout } from "@/lib/api";
import Image from "next/image";
import WorkoutDetailsClient from "@/components/WorkoutDetailsClient";

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 bg-black text-white">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative h-[500px] overflow-hidden rounded-3xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="mb-4 text-4xl font-black uppercase">
            {workout.name}
          </h1>

          <p className="mb-6 text-zinc-400">
            {workout.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-sm font-bold text-black uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mb-8 rounded-2xl bg-[#131416] px-5 py-2 border border-zinc-900">
            <div className="divide-y divide-zinc-800 text-sm">
              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Equipment</span>
                <span className="text-zinc-300">{workout.equipment}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Difficulty</span>
                <span className="text-zinc-300">{workout.difficulty}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Sets</span>
                <span className="text-zinc-300">{workout.sets}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Reps</span>
                <span className="text-zinc-300">{workout.reps}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Duration</span>
                <span className="text-zinc-300">{workout.duration} min</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Calories</span>
                <span className="text-zinc-300">{workout.caloriesBurned} kcal</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-zinc-500 uppercase font-bold tracking-wider text-xs">Rating</span>
                <span className="text-zinc-300">{workout.rating}</span>
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-xl font-bold uppercase">
            Instructions
          </h2>

          <ol className="mb-8 list-none space-y-3 pl-0 text-zinc-300">
            {workout.instructions.map((step, index) => (
              <li key={index} className="flex gap-2">
                <span className="text-zinc-500 font-bold">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-4">
          <WorkoutDetailsClient workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}