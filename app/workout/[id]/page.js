import { getWorkout } from "@/lib/api";
import Image from "next/image";

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
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
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mb-8 rounded-2xl bg-[#131416] p-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Equipment</p>
                <p>{workout.equipment}</p>
              </div>

              <div>
                <p className="text-zinc-500">Difficulty</p>
                <p>{workout.difficulty}</p>
              </div>

              <div>
                <p className="text-zinc-500">Sets</p>
                <p>{workout.sets}</p>
              </div>

              <div>
                <p className="text-zinc-500">Reps</p>
                <p>{workout.reps}</p>
              </div>

              <div>
                <p className="text-zinc-500">Duration</p>
                <p>{workout.duration} min</p>
              </div>

              <div>
                <p className="text-zinc-500">Calories</p>
                <p>{workout.caloriesBurned}</p>
              </div>

              <div>
                <p className="text-zinc-500">Rating</p>
                <p>{workout.rating}</p>
              </div>
            </div>
          </div>

          <h2 className="mb-4 text-xl font-bold uppercase">
            Instructions
          </h2>

          <ol className="mb-8 list-decimal space-y-3 pl-5 text-zinc-300">
            {workout.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black">
              Add to Today's Plan
            </button>

            <button className="rounded-full border border-zinc-700 px-6 py-3">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}