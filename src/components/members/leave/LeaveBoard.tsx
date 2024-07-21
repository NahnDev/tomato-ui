"use client";

import useQueryParam from "@/hooks/useQueryParam";
import { useMemberById } from "../state/member";
import MemberThumbnail from "../MemberThumbnail";

export default function LeaveBoard() {
  const [memberId] = useQueryParam("member");
  const member = useMemberById(memberId);

  if (!member) return <div>Please select a member</div>;
  return (
    <div>
      <MemberThumbnail item={member} />
    </div>
  );
}
