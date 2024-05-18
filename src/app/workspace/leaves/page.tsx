"use client";

import ApprovalBoard from "@/components/leaves/ApprovalBoard";
import CalendarBoard from "@/components/leaves/CalendarBoard";
import LeaveBoard from "@/components/leaves/LeaveBoard";
import Toolbar, { LEAVE_VIEWS } from "@/components/leaves/Toolbar";
import useQueryParam from "@/hooks/useQueryParam";
import useQueryState from "@/hooks/useQueryState";
import React from "react";

export default function LeavesPages() {
  const view = useQueryState("view", LEAVE_VIEWS.CALENDAR);
  return (
    <div className="page grid grid-rows-[auto_1fr]">
      <Toolbar />
      <div className="h-full overflow-hidden p-2">
        {view === LEAVE_VIEWS.STATISTICAL && <LeaveBoard />}
        {view === LEAVE_VIEWS.APPROVAL && <ApprovalBoard />}
        {view === LEAVE_VIEWS.CALENDAR && <CalendarBoard />}
      </div>
    </div>
  );
}
