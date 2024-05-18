import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/react-big-calendar.scss";

import { Calendar as RBC, CalendarProps, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
  return (
    <RBC
      {...props}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      view={props.view ?? "week"}
      toolbar={false}
    ></RBC>
  );
}
