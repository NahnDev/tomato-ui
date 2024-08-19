import { LeaveTypeInterface, LeaveInterface } from "@/types/leave";
import { MemberInterface } from "@/types/member";
import { member1, member2, member3 } from "./member";
import { APP_ICONS } from "@/constants/icon";

// Seed data for LeaveTypeInterface
const leaveTypes: LeaveTypeInterface[] = [
  { id: "1", name: "Marry", icon: "camera", quota: 0, color: "red" },
  { id: "2", name: "Haflday", icon: "circleHalfStroke", quota: 0.5, color: "green" },
  { id: "3", name: "Fullday", icon: "circle", quota: 1, color: "blue" },
];
// Assuming you have some sample member data

// Seed data for LeaveInterface
export const leaves: LeaveInterface[] = [
  {
    id: "1",
    date: "2024-05-17T18:29:55.000+00:00",
    type: leaveTypes[0],
    approveBy: member1,
    reason: "Found a better opportunity",
  },
  {
    id: "2",
    date: "2024-05-16T10:45:30.000+05:00",
    type: leaveTypes[1],
    approveBy: member2,
    reason: "Relocating to a new city",
  },
  { id: "3", date: "2022-08-14T23:20:15.000Z", type: leaveTypes[2], approveBy: member3, reason: "Personal reasons" },
  {
    id: "4",
    date: "2024-05-13T04:08:00.000+02:00",
    type: leaveTypes[2],
    approveBy: member1,
    reason: "Starting own business",
  },
  { id: "5", date: "2024-01-10T15:55:20.000+01:00", type: leaveTypes[1], approveBy: member2, reason: "Career change" },
];
