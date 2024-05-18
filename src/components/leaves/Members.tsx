"use client";

import useQueryParam from "@/hooks/useQueryParam";
import { members } from "@/seed/member";
import { MemberInterface } from "@/types/member";
import { List, ListItem, ListItemPrefix, Avatar, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

export default function Members() {
  const [memberId, setMemberId] = useQueryParam("memberId");
  return (
    <List>
      {members.map((member) => (
        <Member
          active={member.id === memberId}
          key={member.id}
          data={member}
          onClick={() => setMemberId(member.id)}
        ></Member>
      ))}
    </List>
  );
}

function Member(props: Readonly<{ data: MemberInterface; onClick: () => any; active?: boolean }>) {
  return (
    <ListItem onClick={props.onClick} color="red">
      <ListItemPrefix>
        <Avatar variant="circular" alt={props.data.avatar.name} src={props.data.avatar.href} />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          {props.data.fullName}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {props.data.role.name}
        </Typography>
      </div>
    </ListItem>
  );
}
