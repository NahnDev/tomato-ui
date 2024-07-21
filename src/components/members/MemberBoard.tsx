"use client";

import MemberThumbnail from "./MemberThumbnail";
import { useMembers } from "./state/member";

export default function MemberBoard() {
  const members = useMembers();
  return (
    <div className="fluid">
      <div className="gap-2 flex flex-col">
        {members.map((member) => (
          <MemberThumbnail key={member._id} item={member} />
        ))}
      </div>
    </div>
  );
}
