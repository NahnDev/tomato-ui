import { IconKeys } from "@/constants/icon";
import { MemberInterface } from "./member";

export interface LeaveTypeInterface {
  id: string;
  name: string;
  icon: IconKeys;
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
