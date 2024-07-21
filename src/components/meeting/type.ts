import { TUser } from "@/types/TUser";

export type TMeeting = {
  _id: string;
  name: string;
  users: TUser[];
};
