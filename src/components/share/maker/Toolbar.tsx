import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-tailwind/react";
import { IconDefinition, faCrop, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useOnClickOutside } from "usehooks-ts";
import { TAction } from "./type";

enum MenuEnum {
  Component = "component",
}

// use MenuEnum
const MENUS = {
  [MenuEnum.Component]: {
    icon: faPlus,
    label: "Component",
    component: <div />,
  },
};

type TMenuKey = keyof typeof MENUS;
type TToolbarProps = Readonly<{
  onAction: (action: TAction) => void;
}>;

export default function Toolbar(props: TToolbarProps) {
  const ref = React.useRef(null);
  const keys = useMemo(() => Object.keys(MENUS) as (keyof typeof MENUS)[], []);
  const [active, setActive] = useState<TMenuKey>();

  useOnClickOutside(ref, () => {
    setActive(undefined);
  });

  const handleToggle = (key: TMenuKey) => {
    if (active === key) {
      setActive(key);
    } else {
      setActive(undefined);
    }
  };

  return (
    <div ref={ref} className="relative -m-2 ml-0 z-50 flex flex-row]">
      <div className={clsx([" absolute right-full h-full overflow-auto scroll-none py-2 z-50 bg-white"])}>
        {/* {keys.map((key) => (
          <div key={key}>Menu</div>
        ))} */}
      </div>
      <div className="h-full flex flex-col items-center justify-between p-2 border-l-2 border-l-gray-200 bg-white">
        <div className="flex flex-col items-center justify-end gap-2 ">
          {keys.map((key) => (
            <IconMenu
              key={key}
              active={active === key}
              icon={MENUS[key].icon}
              label={MENUS[key].label}
              onClick={() => handleToggle(key)}
            />
          ))}
          <IconMenu icon={faCrop} label="Crop" onClick={() => props.onAction(TAction.Crop)} />
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
