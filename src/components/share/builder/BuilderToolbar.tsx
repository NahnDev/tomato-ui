import React, { useMemo } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-tailwind/react";
import {
  IconDefinition,
  faCaretRight,
  faDownload,
  faFile,
  faGear,
  faHistory,
  faInfo,
  faLayerGroup,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import BuilderUI from "./BuilderUI";
import Popup from "../Popup";
import useList from "@/hooks/useList";
import BuilderStepper from "./BuilderStepper";
import ControlSetting from "./ControlSetting";
import BuilderFileActions from "./BuilderFileActions";
import BuilderHistories from "./BuilderHistories";

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
  [MenuEnum.Stepper]: {
    icon: faLayerGroup,
    label: "Stepper",
    component: <BuilderStepper />,
  },
  [MenuEnum.Ui]: {
    icon: faPlus,
    label: "UI",
    component: <BuilderUI />,
  },
  [MenuEnum.Setting]: {
    icon: faGear,
    label: "Setting",
    component: <ControlSetting />,
  },
  [MenuEnum.Information]: {
    icon: faInfo,
    label: "Information",
    component: <div className="h-40">Information</div>,
  },
  [MenuEnum.File]: {
    icon: faFile,
    label: "File",
    component: <BuilderFileActions />,
  },
  [MenuEnum.History]: {
    icon: faHistory,
    label: "Histories",
    component: <BuilderHistories />,
  },
};
type TMenuKey = keyof typeof MENUS;

export default function BuilderToolbar() {
  const [menus, addMenu, removeMenu, setMenus] = useList<TMenuKey>({ intial: [MenuEnum.Ui] });
  const keys = useMemo(() => Object.keys(MENUS) as (keyof typeof MENUS)[], []);

  return (
    <div className="relative -m-2 ml-0 z-50 flex flex-row]">
      <div className={clsx(["absolute right-full", "h-full overflow-auto scroll-none py-2"])}>
        {keys.map((key) => (
          <Popup key={key} name={MENUS[key].label} onClose={() => removeMenu(key)}>
            {menus.includes(key) && <div className="w-[20em]">{MENUS[key].component}</div>}
          </Popup>
        ))}
      </div>
      <div className="h-full flex flex-col items-center justify-between p-2 border-l-2 border-l-gray-200 bg-white">
        <div className="flex flex-col items-center justify-end gap-2 ">
          {keys.map((key) => (
            <IconMenu
              key={key}
              active={menus.includes(key)}
              icon={MENUS[key].icon}
              label={MENUS[key].label}
              onClick={() => (menus.includes(key) ? removeMenu(key) : addMenu(key))}
            />
          ))}
        </div>
        {menus.length > 0 && <Actions onCompressAll={() => setMenus([])}></Actions>}
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

function Actions(props: Readonly<{ onCompressAll: () => any }>) {
  return (
    <IconButton variant="text" className="text-lg" onClick={props.onCompressAll}>
      <FontAwesomeIcon icon={faCaretRight} />
    </IconButton>
  );
}
