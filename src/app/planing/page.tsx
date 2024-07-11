"use-client";
import ListPlaning from "@/components/planing/ListPlaning";
import PlaningCreator from "@/components/planing/PlaningCreator";
import PageLoading from "@/components/share/PageLoading";
import React, { Suspense } from "react";

export default function PlaningPage() {
  // return <PlaningCreator />;

  return (
    <div className="fluid">
      <div className="h-full flex flex-row">
        <PlaningCreator />
        <div className="flex-1 overflow-auto scroll-none">
          <Suspense fallback={<PageLoading />}>
            <ListPlaning />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
