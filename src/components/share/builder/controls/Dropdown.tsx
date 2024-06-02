import { Button, Radio as MTRadio, Menu, MenuHandler, MenuItem, MenuList, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { ControlProps } from "../types";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dropdown(props: ControlProps) {
  const [selected, setSelected] = useState<any>();
  return (
    <Menu>
      <MenuHandler>
        <Input icon={<FontAwesomeIcon icon={faCaretDown} />} />
      </MenuHandler>
      <MenuList>
        {props.control.config.options.map((option, index) => (
          <MenuItem key={index} onClick={() => setSelected(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
