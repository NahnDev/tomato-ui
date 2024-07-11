"use client";

import PlaningThumbnail from "./PlaningThumbnail";
import { usePlanings } from "./store/planing";

export default function ListPlaning() {
  const planings = usePlanings();
  return (
    <div className="py-2 px-4 flex flex-col gap-2">
      {planings.map((planing, index) => (
        <PlaningThumbnail key={planing._id} item={planing} index={index} />
      ))}
    </div>
  );
}

export function ListPlaningSkeleton() {
  return <div>ListPlaningSkeleton</div>;
}
