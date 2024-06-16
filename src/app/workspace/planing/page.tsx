"use-client";
import PlaningBoard from "@/components/planing/PlaningBoard";
import ClientOnly from "@/components/share/ClientOnly";
import React, { Suspense, useState } from "react";

export default function PlaningPage() {
  return (
    <ClientOnly>
      <PlaningBoard />
    </ClientOnly>
  );
}
