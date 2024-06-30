"use client";

import NotFoundPage from "@/app/not-found";
import PlaningBoard from "@/components/planing/PlaningBoard";
import { useCurrentPlaning } from "@/components/planing/store/planing";

export default function ThePlaningPage() {
  const planing = useCurrentPlaning();

  if (!planing) return <NotFoundPage />;
  return <PlaningBoard />;
}
