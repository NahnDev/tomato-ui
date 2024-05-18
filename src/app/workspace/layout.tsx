"use client";
import { AppNavbar } from "@/components/AppNavbar";
import WorkspaceSidebar from "@/components/WorkspaceSidebar";
import React, { PropsWithChildren } from "react";

export default function WorkspaceLayout(props: Readonly<PropsWithChildren<{}>>) {
  return (
    <div className="grid grid-cols-[auto_1fr] overflow-hidden">
      <WorkspaceSidebar />
      <div className="h-full overflow-hidden">{props.children}</div>
    </div>
  );
}
