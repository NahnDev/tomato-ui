"use client";

import LinkMenu from "@/components/LinkMenu";
import { faUserCircle, faList, faFolderTree, faUserAlt, faPaste } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren } from "react";

export default function ProfileLayout(props: PropsWithChildren) {
  return (
    <div className="fluid grid grid-cols-[20em_1fr]">
      <div className=" bg-white text-base p-8 flex flex-col">
        <ul className="flex flex-col gap-2">
          <LinkMenu href="/profile/informations" className="p-2 px-4 gap-4" icon={faPaste}>
            Profile
          </LinkMenu>
          <LinkMenu href="/profile/settings" className="p-2 px-4 gap-4" icon={faList}>
            Settings
          </LinkMenu>
          <LinkMenu href="/profile/explorer" className="p-2 px-4 gap-4" icon={faFolderTree}>
            Explorer
          </LinkMenu>
          <LinkMenu href="/logout" className="p-2 px-4 gap-4" icon={faUserAlt}>
            Logout
          </LinkMenu>
        </ul>
        <div className="flex-1"></div>
      </div>
      <div className="fluid p-2">{props.children}</div>
    </div>
  );
}
