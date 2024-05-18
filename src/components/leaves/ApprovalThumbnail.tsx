import { LeaveInterface } from "@/types/leave";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem } from "@material-tailwind/react";
import moment from "moment";
import React, { useMemo } from "react";
import LeaveType from "./LeaveType";

export default function ApprovalThumbnail(props: Readonly<{ data: LeaveInterface }>) {
  const date = useMemo(() => moment(props.data.date).format("DD/MM/YYYY"), [props.data]);
  return (
    <ListItem className="p-2">
      <div className="grid grid-cols-[1fr_2fr_4fr_1fr_1fr] p-2 w-full items-center">
        <span className="">
          <LeaveType data={props.data.type} />
        </span>
        <span className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
          <span>{date}</span>
        </span>

        <span className="">{props.data.reason}</span>
      </div>
    </ListItem>
  );
}
