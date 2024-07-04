"use client";

import NotFoundPage from "@/app/not-found";
import PlaningBoard from "@/components/planing/PlaningBoard";
import { currentPlaningState, useCurrentPlaning } from "@/components/planing/store/planing";
import { useParams } from "next/navigation";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";

export default function ThePlaningPage() {
  const planing = useCurrentPlaning();
  if (!planing) return <NotFoundPage />;
  return <PlaningBoard />;
}
