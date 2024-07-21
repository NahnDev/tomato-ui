"use client";

import clsx from "clsx";
import MeetingControl from "./MeetingControl";
import MeetingScene from "./MeetingScene";
import SelfScene from "./SelfScene";
import { useMembers } from "./state/state";
import { TMeeting } from "./type";

export default function MeetingBoard() {
  const members = useMembers();
  return (
    <div className="fluid grid grid-rows-[1fr_auto]  bg-slate-500">
      <div className="fluid grid grid-cols-1fr-auto gap-2 p-2">
        <div className="fluid">{/* <MeetingScene /> */}</div>
        <div className="flex flex-col gap-2 overflow-auto">
          <SelfScene />
          {members.map((member) => (
            <MeetingScene key={member._id} member={member} />
          ))}
        </div>
      </div>
      <div className={clsx(["flex flex-row justify-between items-center", "px-4 bg-white"])}>
        <h6 className="font-bold">Meeting demo</h6>
        <MeetingControl />
        <div></div>
      </div>
    </div>
  );
}
