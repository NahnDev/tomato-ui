import MemberNavigator from "@/components/members/MemberNavigator";
import { PropsWithChildren } from "react";

export default function MemberLayout(props: PropsWithChildren) {
  return (
    <div className="fluid grid grid-cols-auto-1fr gap-4 p-4">
      <MemberNavigator />
      {props.children}
    </div>
  );
}
