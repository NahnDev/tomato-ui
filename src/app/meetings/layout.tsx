import { PropsWithChildren } from "react";

export default function MeetingLayout(props: PropsWithChildren) {
  return <div className="fluid grid grid-cols-1">{props.children}</div>;
}
