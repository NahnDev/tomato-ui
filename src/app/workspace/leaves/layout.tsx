"use client";

import Members from "@/components/leaves/Members";
import { Card } from "@material-tailwind/react";
import React, { PropsWithChildren, Suspense } from "react";

export default function LeavesLayout(props: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[20em_1fr] h-full w-full">
      <div className="h-full p-2">
        <Card className="h-full">
          <Members />
        </Card>
      </div>
      <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
    </div>
  );
}
