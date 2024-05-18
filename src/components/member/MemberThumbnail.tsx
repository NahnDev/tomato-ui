import { MemberInterface } from "@/types/member";
import { Avatar, Typography } from "@material-tailwind/react";
import React from "react";

export default function MemberThumbnail(props: Readonly<{ small?: boolean; data: MemberInterface }>) {
  if (props.small) return <MemberSmallThumbnail data={props.data} />;
  return <div></div>;
}

export function MemberSmallThumbnail(props: Readonly<{ data: MemberInterface }>) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar variant="circular" size="xs" alt={props.data.avatar.name} src={props.data.avatar.href} />
      <Typography variant="h6" color="blue-gray" className="text-base font-normal">
        {props.data.fullName}
      </Typography>
    </div>
  );
}
