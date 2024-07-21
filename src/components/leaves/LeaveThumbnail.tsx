import { LeaveInterface } from "@/types/leave";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem } from "@material-tailwind/react";
import clsx from "clsx";
import { useMemo } from "react";
import MemberThumbnail from "./MemberThumbnail";
import moment from "moment";
import numeral from "numeral";
import LeaveType from "./LeaveType";

export default function LeaveThumbnail(props: Readonly<{ data: LeaveInterface }>) {
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
        <span className="">
          <MemberThumbnail small data={props.data.approveBy} />
        </span>
        <span
          className={clsx([
            "flex flex-row justify-end",
            "text-green-500",
            props.data.type.quota > 0 && "text-waring-500",
            props.data.type.quota >= 1 && "text-red-500",
          ])}
        >
          <span className="font-bold"> {numeral(-props.data.type.quota).format("+0,0")}</span>
        </span>
      </div>
    </ListItem>
  );
}
