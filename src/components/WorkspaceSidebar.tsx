"use client";

import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, IconButton, List, Typography } from "@material-tailwind/react";
import clsx from "clsx";
import { useState } from "react";
import Thumbnail from "./share/Thumbnail";
import { WORKSPACE_MENUS } from "@/constants/menu";

export default function WorkflowSidebar() {
  const [expand, setExpand] = useState(false);
  return (
    <div className="h-full z-10 group">
      <Card className={clsx(["h-full rounded-none relative duration-500 w-full", expand ? "w-60" : "w-16"])}>
        <div
          className={clsx([
            "absolute right-0 bottom-2 translate-x-1/2 duration-500 group-hover:visible invisible",
            expand && "rotate-180",
          ])}
        >
          <IconButton size="sm" variant="text" className="rounded-full duration-200" onClick={() => setExpand(!expand)}>
            <FontAwesomeIcon
              className="text-lg text-slate-500 opacity-50"
              icon={faChevronCircleRight}
            ></FontAwesomeIcon>
          </IconButton>
        </div>
        <List className={clsx(["min-w-0 pt-4 w-full overflow-hidden"])}>
          {WORKSPACE_MENUS.map((menu, index) => (
            <Thumbnail key={menu.href} href={menu.href} icon={menu.icon} name={menu.name} expand={expand} />
          ))}
        </List>
        <div className="flex-1"></div>
        {expand && (
          <div className="p-2 flex justify-center items-center">
            <Typography className="font-thin text-sm text-slate-400" as="h6">
              @Tomato &#8482;
            </Typography>
          </div>
        )}
      </Card>
    </div>
  );
}
