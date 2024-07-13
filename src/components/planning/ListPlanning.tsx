"use client";

import PlanningThumbnail from "./PlanningThumbnail";
import { usePlannings } from "./store/planning";

export default function ListPlanning() {
  const plannings = usePlannings();
  return (
    <div className="py-2 px-4 flex flex-col gap-2">
      {plannings.map((planning, index) => (
        <PlanningThumbnail key={planning._id} item={planning} index={index} />
      ))}
    </div>
  );
}

export function ListPlanningSkeleton() {
  return <div>ListPlanningSkeleton</div>;
}
