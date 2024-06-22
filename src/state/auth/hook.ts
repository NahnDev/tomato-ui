import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "./atom";
import { TRegisterDto, TUser, TUserCredentials } from "@/types/TUser";
import { AuthApi } from "@/api/AuthApi";
import Cookies from "js-cookie";
import { set } from "lodash";
import { use, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useRecoilState(authState);

  useEffect(() => {
    setState({ ...state, error: undefined });
  }, [pathname]);

  const redirect = () => {
    console.log("redirect", pathname);
    setState({ ...state, redirect: pathname });
    router.push("/login");
  };

  const register = async (payload: TRegisterDto) => {
    try {
      setState({ ...state, error: undefined });
      const { user, accessToken } = await AuthApi.register(payload);
      Cookies.set("token", accessToken);
      setState({
        isAuthenticated: true,
        user,
      });
      console.log(state);
      router.push(state.redirect || "/");
    } catch (error: any) {
      setState({ ...state, error: new Error(error.response.data) });
    }
  };
  const login = async (credentials: TUserCredentials) => {
    try {
      setState({ ...state, error: undefined });
      const { user, accessToken } = await AuthApi.login(credentials);
      Cookies.set("token", accessToken);
      setState({
        isAuthenticated: true,
        user,
      });
      console.log(state.redirect || "/");
      router.push(state.redirect || "/");
    } catch (error: any) {
      setState({ ...state, error: new Error(error.response.data) });
    }
  };

  function logout() {
    Cookies.remove("token");
    setState({ isAuthenticated: false });
  }

  const autoLogin = async () => {
    try {
      const { user, accessToken } = await AuthApi.autoLogin();
      Cookies.set("token", accessToken);
      setState({
        isAuthenticated: true,
        user,
      });
    } catch (error) {
      setState({ isAuthenticated: false });
    }
  };

  return {
    ...state,
    login,
    logout,
    autoLogin,
    register,
    redirect,
  };
}

export function useIsAuthenticated(callback: () => void) {
  const { isAuthenticated } = useRecoilValue(authState);
  useEffect(() => {
    if (isAuthenticated) {
      callback();
    }
  }, [isAuthenticated, callback]);
}
