"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faGripVertical,
  faLayerGroup,
  faList,
  faPaste,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import SearchInput from "./share/SearchInput";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { useAuth } from "@/state/auth/hook";

export function AppNavbar() {
  const router = useRouter();
  return (
    <Navbar fullWidth className="bg-opacity-100 border-b-2 border-slate-200 py-1 z-40">
      <div className="w-full mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex justify-start items-center gap-2 px-4">
          <Image alt="" src={"/favicon.ico"} width={24} height={24}></Image>
          <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-semibold">
            Tomato UI
          </Typography>
        </div>
        <div className="hidden lg:block">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <LinkMenu href="/workspace" icon={faLayerGroup}>
              Workspace
            </LinkMenu>
            <LinkMenu href="/members" icon={faUserAlt}>
              Members
            </LinkMenu>
            <LinkMenu href="/blocks" icon={faGripVertical}>
              Blocks
            </LinkMenu>
            <LinkMenu href="/docs" icon={faPaste}>
              Docs
            </LinkMenu>
            <LinkMenu href="/planing" icon={faClipboardList}>
              Planing
            </LinkMenu>
          </ul>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-x-1">
          <SearchInput></SearchInput>
          <UserInformation />
        </div>
      </div>
    </Navbar>
  );
}

function UserInformation() {
  const { user, isAuthenticated, autoLogin } = useAuth();
  useEffect(() => {
    autoLogin();
  }, []);

  if (!isAuthenticated)
    return (
      <>
        <Link href="/login" passHref>
          <Button variant="text" size="sm" className="hidden lg:inline-block">
            <span>Log In</span>
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button variant="gradient" size="sm" className="hidden lg:inline-block">
            <span>Sign in</span>
          </Button>
        </Link>
      </>
    );
  return (
    <div className="flex flex-row gap-2 items-center p-2">
      <FontAwesomeIcon icon={faUserAlt} />
      <span className="text-sm text-slate-900">{user?.name ?? "Guest"}</span>
    </div>
  );
}

function LinkMenu(props: Readonly<PropsWithChildren<{ href: string; icon: IconProp }>>) {
  const isActive = useIsActiveRoute(props.href);
  return (
    <Typography
      as="li"
      variant="small"
      color={isActive ? "red" : "blue-gray"}
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
      <Link href={props.href} className="flex items-center">
        {props.children}
      </Link>
    </Typography>
  );
}
