import {
  faPaste,
  faPlusCircle,
  faLayerGroup,
  faLeftLong,
  faChevronLeft,
  faChevronCircleLeft,
  faPlayCircle,
  faClose,
  faFileCircleXmark,
  faXmarkCircle,
  faAnglesRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, List } from "@material-tailwind/react";
import React, { useState } from "react";
import TemplateThumbnail from "./TemplateThumbnail";
import { faNode } from "@fortawesome/free-brands-svg-icons";
import TemplateCreator from "./TemplateCreator";
import { useBoolean } from "usehooks-ts";
import clsx from "clsx";
import SidebarButton from "../share/button/SidebarButton";
import IconButton from "../share/button/IconButton";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function TemplateSidebar() {
  const { value: shown, setFalse: handleClose, setTrue: handleOpen } = useBoolean();
  const [expand, setExpand] = useLocalStorage("templateSidebarExpand", true, false);

  return (
    <div className={clsx(["fluid", "grid grid-cols-1fr-auto duration-500"])}>
      {expand ? (
        <div className={clsx(["h-full w-72 duration-500 p-1"])}>
          <Card className="h-full">
            <div className="py-2 px-4 flex flex-row justify-between items-center group">
              <div className="flex-1 flex flex-row text-slate-700 gap-2 items-center">
                <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
                <h4 className="font-bold text-sm">Templates</h4>
              </div>
              <IconButton className="text-base" icon={faPlusCircle} onClick={handleOpen}></IconButton>
              <IconButton className="text-base " icon={faArrowCircleLeft} onClick={() => setExpand(false)}></IconButton>
            </div>
            <TemplateList />
          </Card>
          <TemplateCreator open={shown} onClose={handleClose} />
        </div>
      ) : (
        <div
          className={clsx(["flex items-center justify-center duration-500 bg-white border-r-2 w-8 cursor-pointer"])}
          onClick={() => setExpand(true)}
        >
          <div className="rotate-90 w-8 flex flex-row items-center gap-2 text-sm font-bold">
            <FontAwesomeIcon icon={faLayerGroup} />
            <span> Templates</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplateList() {
  return (
    <List>
      <TemplateThumbnail icon={faPaste} id="12" name="Events"></TemplateThumbnail>
      <TemplateThumbnail icon={faNode} id="13" name="Programmers"></TemplateThumbnail>
    </List>
  );
}
