import { TIconKey } from "@/constants";
import { MemberInterface } from "./member";

export interface LeaveTypeInterface {
  id: string;
  name: string;
  icon: TIconKey;
  quota: number;
  color: string;
}

export interface LeaveInterface {
  id: string;
  date: string;
  type: LeaveTypeInterface;
  reason: string;
  approveBy: MemberInterface;
}
