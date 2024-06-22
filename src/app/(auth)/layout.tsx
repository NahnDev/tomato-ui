import { PropsWithChildren } from "react";

export default function AuthLayout(props: PropsWithChildren<{}>) {
  return <div className="w-full h-full">{props.children}</div>;
}
