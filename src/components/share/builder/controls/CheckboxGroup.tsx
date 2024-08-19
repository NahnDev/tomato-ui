import { Typography } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { ControlProps } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OptionDefaultSetting } from "../settings/OptionSetting";
import { TOptionSetting, TPrefixSetting } from "@/types/control";
import { APP_ICONS } from "@/constants/icon";
import clsx from "clsx";
import { PrefixDefaultSetting } from "../settings/PrefixSetting";

export default function CheckboxGroup(props: ControlProps) {
  const [selected, setSelected] = useState<any>([]);
  const options = useMemo(() => ({ ...OptionDefaultSetting, ...props.control.config.options }), [props]);
  const prefixSetting = useMemo(() => ({ ...PrefixDefaultSetting, ...props.control.config.prefix }), [props]);

  const { iconChecked, iconUnChecked, iconCheckedColor, iconUnCheckedColor } = prefixSetting;
  const { choices } = options;

  const handleCheck = (checked: boolean, value: any) => {
    if (checked) {
      if (!options.multiple) {
        setSelected([value]);
        return;
      }
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((v: string) => v !== value));
    }
  };

  return (
    <div className="p-2">
      <Typography className="px-2 text-blue-gray-400 text-sm">{props.control.config.label}</Typography>
      <div className={clsx(["flexflex-wrap gap-1 p-2", "flex-col"])}>
        {choices?.map((choice, index) => (
          <CheckItem
            key={index}
            checked={selected.includes(choice.value)}
            label={choice.label}
            onChange={(checked) => handleCheck(checked, choice.value)}
            iconChecked={iconChecked}
            iconUnChecked={iconUnChecked}
            iconCheckedColor={iconCheckedColor}
            iconUnCheckedColor={iconUnCheckedColor}
          />
        ))}
      </div>
    </div>
  );
}

type CheckItemProps = TPrefixSetting & {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckItem(props: CheckItemProps) {
  const color = props.checked ? props.iconCheckedColor : props.iconUnCheckedColor;
  return (
    <div
      className={clsx([
        "flex-1",
        "flex items-center gap-2 p-2",
        "cursor-pointer select-none",
        "rounded-lg hover:bg-slate-200",
      ])}
      onClick={() => props.onChange(!props.checked)}
      style={{ color }}
    >
      <div className="px-2 w-8">
        {props.checked ? (
          <FontAwesomeIcon icon={APP_ICONS[props.iconChecked]} color={props.iconCheckedColor} />
        ) : (
          <FontAwesomeIcon icon={APP_ICONS[props.iconUnChecked]} color={props.iconUnCheckedColor} />
        )}
      </div>
      <div>
        <span>{props.label}</span>
      </div>
    </div>
  );
}
