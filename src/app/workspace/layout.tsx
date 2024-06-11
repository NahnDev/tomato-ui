"use client";
import { AppNavbar } from "@/components/AppNavbar";
import WorkspaceSidebar from "@/components/WorkspaceSidebar";
import React, { PropsWithChildren, Suspense } from "react";

export default function WorkspaceLayout(props: Readonly<PropsWithChildren<{}>>) {
  return (
    <div className="grid grid-cols-[auto_1fr] overflow-hidden size-full">
      <WorkspaceSidebar />
      <div className="h-full overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
      </div>
    </div>
  );
}
