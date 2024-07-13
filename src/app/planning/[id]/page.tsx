"use client";

import NotFoundPage from "@/app/not-found";
import PlanningBoard from "@/components/planning/PlanningBoard";
import { currentPlanningState, useCurrentPlanning } from "@/components/planning/store/planning";
import { useParams } from "next/navigation";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";

export default function ThePlanningPage() {
  const planning = useCurrentPlanning();
  if (!planning) return <NotFoundPage />;
  return <PlanningBoard />;
}
