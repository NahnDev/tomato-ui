"use-client";
import PlaningBoard from "@/components/planing/PlaningBoard";
import AuthRequired from "@/components/share/AuthRequired";
import ClientOnly from "@/components/share/ClientOnly";
import React, { Suspense, useState } from "react";

export default function PlaningPage() {
  return (
    <ClientOnly>
      <AuthRequired>
        <PlaningBoard />
      </AuthRequired>
    </ClientOnly>
  );
}
