import { TUser } from "@/types/TUser";
import { atom } from "recoil";

type AuthState = {
  isAuthenticated?: boolean;
  accessToken?: string;
  user?: TUser;
  error?: Error;
  redirect?: string;
};

export const authState = atom<AuthState>({
  key: "authState",
  default: {},
});
