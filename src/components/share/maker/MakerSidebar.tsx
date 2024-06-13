import {
  faPlus,
  faGear,
  faInfo,
  faFile,
  faHistory,
  IconDefinition,
  faImage,
  faFileUpload,
  faUpload,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";
import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { IconButton, Menu } from "@material-tailwind/react";
import ShapeMenu from "./menus/ShapeMenu";
import ShapeSetting from "./menus/ShapeSetting";

enum MenuEnum {
  Stepper = "stepper",
  Ui = "ui",
  Setting = "setting",
  Information = "information",
  File = "file",
  History = "history", // Added "History" to MenuEnum
}

// use MenuEnum
const MENUS = {
  [MenuEnum.Ui]: {
    icon: faShapes,
    label: "Shape",
    component: <ShapeMenu />,
  },
  [MenuEnum.Setting]: {
    icon: faGear,
    label: "Setting",
    component: <ShapeSetting />,
  },
  [MenuEnum.Information]: {
    icon: faInfo,
    label: "Information",
    component: <div />,
  },
};

type TMenuKey = keyof typeof MENUS;

export default function MakerSidebar() {
  const ref = React.useRef(null);
  const keys = useMemo(() => Object.keys(MENUS) as (keyof typeof MENUS)[], []);
  const [menu, setMenu] = useState<TMenuKey>();

  return (
    <div className="relative">
      {menu && <div className="absolute right-full w-80 h-full bg-white">{MENUS[menu]?.component}</div>}
      <div className="h-full flex flex-col items-center justify-between p-2 border-l-2 border-l-gray-200 bg-white">
        <div className="flex flex-col items-center justify-end gap-2 ">
          {keys.map((key) => (
            <IconMenu
              key={key}
              active={key === menu}
              icon={MENUS[key].icon}
              label={MENUS[key].label}
              onClick={() => setMenu(key === menu ? undefined : key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function IconMenu(props: Readonly<{ icon: IconDefinition; label: string; active?: boolean; onClick: () => any }>) {
  return (
    <IconButton
      variant="text"
      className={clsx(["text-lg", props.active && "text-red-500 bg-gray-100"])}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={props.icon} />
    </IconButton>
  );
}
