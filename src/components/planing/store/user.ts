import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import { TUser } from "./type";
import { recoilPersist } from "recoil-persist";
import { current } from "tailwindcss/colors";
import { v4 as uuidV4 } from "uuid";

type UserState = TUser | null;
const { persistAtom } = recoilPersist();

export const userAtom = atom<UserState>({
  key: "userAtom",
  default: null as UserState | null,
  effects_UNSTABLE: [persistAtom],
});

// hooks
export function useUser() {
  return useRecoilState(userAtom) as [TUser | null, (user: TUser) => void];
}
