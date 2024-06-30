import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "./atom";
import { TRegisterDto, TUserCredentials } from "@/types/TUser";
import { AuthApi } from "@/api/AuthApi";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useRedirectSearchParams from "@/hooks/useRedirectQuery";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useRecoilState(authState);
  const redirectSearchParams = useRedirectSearchParams();

  useEffect(() => {
    setState({ ...state, error: undefined });
  }, [pathname]);

  const register = async (payload: TRegisterDto) => {
    try {
      setState({ ...state, error: undefined });
      const { user, accessToken } = await AuthApi.register(payload);
      Cookies.set("token", accessToken);
      setState({
        isAuthenticated: true,
        user,
      });
      router.push(redirectSearchParams.get("redirect") as string);
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
      router.push(redirectSearchParams.get("redirect") as string);
    } catch (error: any) {
      setState({ ...state, error: new Error(error.response.data) });
    }
  };

  function logout() {
    Cookies.remove("token");
    setState({ isAuthenticated: false });
    router.push("/login");
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

  const redirect = () => {
    router.push(`/login?${redirectSearchParams.toString()}`);
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
