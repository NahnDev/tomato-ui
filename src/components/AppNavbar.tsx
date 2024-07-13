"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
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
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SearchInput from "./share/SearchInput";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { useAuth } from "@/state/auth/hook";
import useRedirectSearchParams from "@/hooks/useRedirectQuery";
import Drawer from "./share/Drawer";
import LinkMenu from "./LinkMenu";
import UserInformation from "./UserInformation";

export function AppNavbar() {
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
            <LinkMenu href="/planning" icon={faClipboardList}>
              Planning
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
