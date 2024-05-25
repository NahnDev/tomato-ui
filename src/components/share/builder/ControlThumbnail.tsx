import { faCalendar, faFont } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { useDrag } from "react-dnd";
import { THUMBNAILS, ControlType } from "@/constants/control";
import clsx from "clsx";
import { DndTypes } from "@/constants/dnd";

type ControlThumbnailProps = Readonly<{ type: ControlType }>;

export default function ControlThumbnail(props: ControlThumbnailProps) {
  const { icon, label } = useMemo(() => THUMBNAILS[props.type], [props]);
  const [collected, dragRef] = useDrag({ type: DndTypes.Control, item: { type: props.type } });

  return (
    <div className="relative">
      <div ref={dragRef} className={clsx(["p-2 rounded-md bg-gray-100"])} draggable>
        <div className="flex flex-row justifiy-start items-center">
          <div className="w-10 flex justify-center">
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
          </div>
          <label>{label}</label>
        </div>
      </div>
    </div>
  );
}
