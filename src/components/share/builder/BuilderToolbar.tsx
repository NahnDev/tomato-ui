import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, menu } from "@material-tailwind/react";
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
import ControlSetting from "./ControlSetting";
import BuilderFileActions from "./BuilderFileActions";
import BuilderHistories from "./BuilderHistories";
import { useOnClickOutside } from "usehooks-ts";
import BuilderInformation from "./BuilderInformation";

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
    component: <BuilderInformation />,
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
  const ref = React.useRef(null);
  const keys = useMemo(() => Object.keys(MENUS) as (keyof typeof MENUS)[], []);

  const [actives, setActives] = useState<TMenuKey[]>([]);
  const [absolutes, addAbsolute, removeAbsolute] = useList<TMenuKey>();
  const absoluteActives = useMemo(() => actives.filter((menu) => absolutes.includes(menu)), [actives, absolutes]);

  useOnClickOutside(ref, () => {
    setActives(absoluteActives);
  });

  const handleShow = (key: TMenuKey) => {
    setActives([...absoluteActives, key]);
  };
  const handleClose = (key: TMenuKey) => {
    setActives(actives.filter((menu) => menu !== key));
  };
  const handleRelative = (key: TMenuKey) => {
    removeAbsolute(key);
    handleShow(key);
  };

  return (
    <div ref={ref} className="relative -m-2 ml-0 z-50 flex flex-row]">
      <div className={clsx(["absolute right-full", "h-full overflow-auto scroll-none py-2"])}>
        {keys.map((key) => (
          <Popup
            key={key}
            name={MENUS[key].label}
            onClose={() => handleClose(key)}
            onAbsolute={() => addAbsolute(key)}
            onRelative={() => handleRelative(key)}
          >
            {actives.includes(key) && <div className="w-[20em]">{MENUS[key].component}</div>}
          </Popup>
        ))}
      </div>
      <div className="h-full flex flex-col items-center justify-between p-2 border-l-2 border-l-gray-200 bg-white">
        <div className="flex flex-col items-center justify-end gap-2 ">
          {keys.map((key) => (
            <IconMenu
              key={key}
              active={actives.includes(key)}
              icon={MENUS[key].icon}
              label={MENUS[key].label}
              onClick={() => (actives.includes(key) ? handleClose(key) : handleShow(key))}
            />
          ))}
        </div>
        {actives.length > 0 && <Actions onCompressAll={() => setActives([])}></Actions>}
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
