import { atom, selector, useRecoilValue } from "recoil";
import { TMember } from "../type";
import MemberApi from "./api";
import { select } from "@material-tailwind/react";

const memberState = atom({
  key: "memberState",
  default: selector({
    key: "memberState/default",
    get: async () => {
      const members = await MemberApi.getMembers();
      return members as TMember[];
    },
  }),
});

export function useMembers() {
  return useRecoilValue(memberState);
}

export function useMemberById(id: string) {
  const members = useMembers();
  return members.find((member) => member._id === id);
}
