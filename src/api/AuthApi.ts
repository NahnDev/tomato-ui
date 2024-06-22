// make AuthApi with axios
import { axiosInstance } from "./axios";
import { TUser, TUserCredentials } from "@/types/TUser";

type TLoginResponse = {
  user: TUser;
  accessToken: string;
};

// use class
export class AuthApi {
  static async login(credentials: TUserCredentials): Promise<TLoginResponse> {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  }

  static async register(payload: TUserCredentials): Promise<TLoginResponse> {
    const response = await axiosInstance.post("/auth/register", payload);
    return response.data;
  }

  static async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout");
  }

  static async autoLogin(): Promise<TLoginResponse> {
    const response = await axiosInstance.post("/auth/auto-login");
    return response.data;
  }
}
