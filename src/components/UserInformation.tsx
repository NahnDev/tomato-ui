import useRedirectSearchParams from "@/hooks/useRedirectQuery";
import { useAuth } from "@/state/auth/hook";
import { faUserCircle, faList, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Drawer from "./share/Drawer";
import LinkMenu from "./LinkMenu";
import BrowserStatus from "./BrowserStatus";

export default function UserInformation() {
  const [menu, setMenu] = useState(false);
  const { user, isAuthenticated, autoLogin } = useAuth();
  useEffect(() => {
    autoLogin();
  }, []);

  const router = useRouter();
  const isLoginPage = usePathname().includes("/login");
  const isRegisterPage = usePathname().includes("/register");
  const redirectSearchParams = useRedirectSearchParams();

  const handleToLogin = () => {
    router.push(`/login?${redirectSearchParams.toString()}`);
  };
  const handleToRegister = () => {
    router.push(`/register?${redirectSearchParams.toString()}`);
  };

  if (!isAuthenticated)
    return (
      <>
        {!isLoginPage && (
          <Button variant="text" size="sm" className="hidden lg:inline-block" onClick={handleToLogin}>
            <span>Log In</span>
          </Button>
        )}
        {!isRegisterPage && (
          <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={handleToRegister}>
            <span>Sign in</span>
          </Button>
        )}
      </>
    );
  return (
    <div className="flex flex-row gap-2 items-center p-2">
      <span className="text-sm text-slate-900">{user?.name ?? "Guest"}</span>
      <Button
        onClick={() => setMenu(!menu)}
        variant="text"
        className="text-xl cursor-pointer rounded-full w-8 h-8 p-0 flex justify-center items-center"
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </Button>
      <Drawer open={menu} onClose={() => setMenu(false)}>
        <div className="w-[40em] h-screen max-w-[80vw] text-base p-8 grid grid-rows-[1fr_auto]">
          <ul className="flex flex-col gap-2">
            <LinkMenu href="/profile" icon={faUserCircle}>
              Profile
            </LinkMenu>
            <LinkMenu href="/settings" icon={faList}>
              Settings
            </LinkMenu>
            <LinkMenu href="/logout" icon={faUserAlt}>
              Logout
            </LinkMenu>
          </ul>
          <BrowserStatus></BrowserStatus>
        </div>
      </Drawer>
    </div>
  );
}
