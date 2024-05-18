import React from "react";
import Calendar from "../share/Calendar";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { CalendarProps, DateHeaderProps, EventProps, View } from "react-big-calendar";
import moment from "moment";
import { leaves } from "@/seed/leave";
import { LeaveInterface } from "@/types/leave";
import useQueryState from "@/hooks/useQueryState";
import { LEAVE_CALENDAR_TYPES } from "./Toolbar";

const Components: CalendarProps["components"] = {
  week: {
    header: (props) => <WeekDateHeader {...props} />,
    event: (props) => <WeekDateEvent {...(props.event as any)} />,
  },
  month: {
    header: (props) => <MonthHeader {...props} />,
    dateHeader: (props) => <MonthDateHeader {...props} />,
    event: (props) => <MonthDateEvent {...(props.event as any)} />,
  },
};

export default function CalendarBoard() {
  const type = useQueryState("type", LEAVE_CALENDAR_TYPES.WEEK);
  const date = useQueryState("date", new Date().toISOString());
  return (
    <div className="container">
      <Calendar
        date={date}
        view={type as any}
        events={leaves.map((leave) => ({
          title: leave.reason,
          start: new Date(leave.date),
          end: moment(leave.date)
            .add(Math.round(Math.random() * 50), "hours")
            .toDate(),
          resource: leave,
        }))}
        components={Components}
      />
    </div>
  );
}

function WeekDateHeader(props: Readonly<{ date: Date }>) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <Typography className="font-semibold text-2xl">{props.date.getDate()}</Typography>
      <div className="flex flex-col  text-[0.75em] font-semibold items-start">
        <span>{moment(props.date).format("ddd")}</span>
        <span className=" text-gray-500 font-normal">{moment(props.date).format("MM/YY")}</span>
      </div>
    </div>
  );
}

function MonthHeader(props: Readonly<{ date: Date }>) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <Typography className="font-semibold text-base">{moment(props.date).format("ddd")}</Typography>
      <div className="flex flex-col  text-[0.75em] font-semibold items-start">
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

function WeekDateEvent(props: Readonly<{ start: Date; end: Date; title: string; resource: LeaveInterface }>) {
  return (
    <Card
      color={props.resource.type.color as any}
      className="rounded-sm h-full w-full bg-opacity-40 border-l-2"
      style={{ borderColor: props.resource.type.color }}
    >
      <div className="p-2  text-black">
        <Typography className="font-semibold text-xs uppercase py-2" style={{ color: props.resource.type.color }}>
          {props.title}
        </Typography>
        <Typography className="font-semibold text-sm">
          {moment(props.end.getTime() - props.start.getTime()).format("HH:mm:ss")}
        </Typography>
        <Typography className="text-xs font-normal text-gray-700">
          ({moment(props.start).format("HH:mm")} - {moment(props.end).format("HH:mm")})
        </Typography>
      </div>
    </Card>
  );
}

function MonthDateEvent(props: Readonly<{ start: Date; end: Date; title: string; resource: LeaveInterface }>) {
  return (
    <Card
      color={props.resource.type.color as any}
      className="rounded-sm h-full w-full bg-opacity-40 border-l-2"
      style={{ borderColor: props.resource.type.color }}
    >
      <div className="px-2 text-black flex flex-row gap-2 items-center">
        <Typography className="font-semibold text-xs uppercase py-2" style={{ color: props.resource.type.color }}>
          {props.title}
        </Typography>
        <Typography className="text-xs font-normal text-gray-700">
          ({moment(props.start).format("DD/MM HH:mm")} - {moment(props.end).format("DD/MM HH:mm")})
        </Typography>
      </div>
    </Card>
  );
}

function MonthDateHeader(props: Readonly<DateHeaderProps>) {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <span className="font-semibold">{moment(props.date).format("DD")}</span>
      <span className="text-[0.5em]">{moment(props.date).format("MM/YYYY")}</span>
    </div>
  );
}
