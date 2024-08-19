import { APP_ICONS, IconKeys } from "@/constants/icon";
import { faBan, faBorderNone, faSlash, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import clsx from "clsx";
import { useRef, useState, useMemo, use } from "react";
import { useOnClickOutside } from "usehooks-ts";

export type IconPickerProps = {
  value?: IconKeys;
  onChange: (value?: IconKeys) => any;
};
export default function IconPicker(props: IconPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const keys = useMemo(() => Object.keys(APP_ICONS) as IconKeys[], []);

  return (
    <div ref={ref}>
      <Menu open={open} handler={setOpen}>
        <MenuHandler>
          <div className="size-6 m-2 flex items-center justify-center rounded-full ring-2 ring-gray-500 ring-offset-2">
            {props.value && <FontAwesomeIcon icon={APP_ICONS[props.value]} />}
          </div>
        </MenuHandler>
        <MenuList className="bg-transparent outline-none border-none shadow-none">
          <div className="grid grid-cols-6 gap-2 bg-white shadow-md shadow-gray-500 rounded-md p-4">
            <IconItem onClick={() => props.onChange(undefined)} />
            {keys.map((key) => (
              <IconItem
                key={key}
                icon={APP_ICONS[key]}
                onClick={() => {
                  props.onChange(key);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </MenuList>
      </Menu>
    </div>
  );
}

function IconItem(props: { icon?: IconDefinition; onClick: () => any }) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      {props.icon && <FontAwesomeIcon icon={props.icon} />}
    </div>
  );
}
