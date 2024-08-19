import { Menu, MenuHandler, MenuItem, MenuList, Input } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { ControlProps } from "../types";
import { faCaretDown, faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSet } from "react-use";
import { PrefixDefaultSetting } from "../settings/PrefixSetting";
import { OptionDefaultSetting } from "../settings/OptionSetting";
import { APP_ICONS } from "@/constants/icon";

export default function Dropdown(props: ControlProps) {
  const [selected, { add, has, remove }] = useSet<string>(new Set());

  const optionSetting = useMemo(() => ({ ...OptionDefaultSetting, ...props.control.config.options } ?? {}), [props]);
  const prefixSetting = useMemo(() => ({ ...PrefixDefaultSetting, ...props.control.config.prefix }), [props]);
  const { iconChecked, iconUnChecked, iconCheckedColor, iconUnCheckedColor } = prefixSetting;
  const { multiple } = optionSetting;
  const choices = optionSetting.choices ?? [];
  const selectedStr = choices
    .filter((option) => has(option.value))
    .map((option) => option.label)
    .join(", ");

  const handleSelect = (value: string) => {
    if (!has(value)) {
      if (multiple) {
        add(value);
      } else {
        selected.clear();
        add(value);
      }
    } else {
      remove(value);
    }
  };
  return (
    <Menu dismiss={{ itemPress: multiple ? false : true }}>
      <MenuHandler>
        <div className="relative flex flex-row items-center">
          <FontAwesomeIcon icon={APP_ICONS[iconChecked]} className="absolute w-10" color={iconCheckedColor} />
          <Input
            readOnly
            className="pl-10"
            icon={<FontAwesomeIcon icon={faCaretDown} />}
            label={props.control.config.label}
            value={selectedStr}
          />
        </div>
      </MenuHandler>
      <MenuList className="min-w-80 gap-1">
        {choices.map(({ value, label }, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelect(value)}
            className="flex items-center w-full p-2 py-4 gap-2"
            style={{ color: has(value) ? iconCheckedColor : iconUnCheckedColor }}
          >
            <FontAwesomeIcon icon={has(value) ? APP_ICONS[iconChecked] : APP_ICONS[iconUnChecked]} className="w-8" />
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
