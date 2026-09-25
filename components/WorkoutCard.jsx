import Link from "next/link";
import Image from "next/image";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block overflow-hidden rounded-3xl bg-[#131416] transition hover:-translate-y-1"
    >
      <div className="relative h-56">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-lg font-bold uppercase">
          {workout.name}
        </h3>

        <p className="mb-4 text-sm text-zinc-400">
          {workout.equipment}
        </p>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{workout.duration} min</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}