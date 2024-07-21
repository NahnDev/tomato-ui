"use-client";
import ListPlanning from "@/components/planning/ListPlanning";
import PlanningCreator from "@/components/planning/PlanningCreator";
import PageLoading from "@/components/share/PageLoading";
import React, { Suspense } from "react";

export default function PlanningPage() {
  // return <PlanningCreator />;

  return (
    <div className="fluid">
      <div className="container mx-auto flex flex-row">
        <PlanningCreator />
        <div className="flex-1 overflow-auto scroll-none">
          <Suspense fallback={<PageLoading />}>
            <ListPlanning />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
