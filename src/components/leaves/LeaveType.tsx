import { APP_ICONS } from "@/constants/icon";
import { LeaveTypeInterface } from "@/types/leave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";

export default function LeaveType(props: Readonly<{ data: LeaveTypeInterface }>) {
  return (
    <Button size="sm" className={clsx(["p-1 px-2 rounded-md text-xs"])} color={props.data.color as any}>
      <div className="flex gap-2 justify-start items-center">
        <FontAwesomeIcon icon={APP_ICONS[props.data.icon]}></FontAwesomeIcon>
        <span>{props.data.name}</span>
      </div>
    </Button>
  );
}
