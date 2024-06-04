import { Menu, MenuHandler, MenuItem, MenuList, Input } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { ControlProps } from "../types";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TOption } from "@/types/control";

export default function Dropdown(props: ControlProps) {
  const [selected, setSelected] = useState<TOption>();

  const options = useMemo(() => props.control.config.options ?? [], [props]);
  const selectedStr = options.find((option) => option.value === selected)?.label ?? "";
  return (
    <Menu>
      <MenuHandler>
        <Input icon={<FontAwesomeIcon icon={faCaretDown} />} label={props.control.config.label} value={selectedStr} />
      </MenuHandler>
      <MenuList>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => setSelected(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
