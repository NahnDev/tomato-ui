import { atom, atomFamily, selectorFamily, useRecoilValue } from "recoil";
import MeetingApi from "./MeetingApi";
import { TMeeting } from "../type";
import { useParams } from "next/navigation";
import { useAuth } from "@/state/auth/hook";

export const meetingState = atomFamily({
  key: "meetingState",
  default: selectorFamily({
    key: "meetingState/default",
    get: (id: string) => async () => {
      return (await MeetingApi.getOne(id)) as TMeeting;
    },
  }),
});

export function useMeeting() {
  const { id } = useParams();
  return useRecoilValue(meetingState(id as string));
}

export function useMembers() {
  const { user } = useAuth();
  const { id } = useParams();
  return useRecoilValue(meetingState(id as string)).users.filter((u) => u._id !== user?._id);
}
