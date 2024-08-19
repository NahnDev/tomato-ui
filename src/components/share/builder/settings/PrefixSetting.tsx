import React from "react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import { TControlSetting } from "@/types/control";
import Heading from "./Heading";
import { IconKeys } from "@/constants/icon";
import IconPicker from "../../IconPicker";
import ColorPicker from "../../ColorPicker";
import { AllColors } from "@/constants/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";

export const PrefixDefaultSetting = {
  iconChecked: IconKeys.CircleChecked,
  iconUnChecked: IconKeys.Circle,
  iconCheckedColor: AllColors.DarkGreen,
  iconUnCheckedColor: AllColors.LightGray,
} as Exclude<TControlSetting["prefix"], undefined>;

export default function PrefixSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const setting = { ...PrefixDefaultSetting, ...props.data.prefix };
  const { iconChecked, iconUnChecked, iconCheckedColor, iconUnCheckedColor } = setting;

  const change = (params: Partial<TControlSetting["prefix"]>) => {
    updateControlSetting({ prefix: { ...setting, ...params } });
  };

  return (
    <div className="p-2">
      <Heading label="Prefix" />
      <div className="p-2">
        <div className="grid grid-cols-2 gap-8 text-sm p-2">
          <div className="flex flex-row items-center border-2 border-slate-200 rounded-lg">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 -translate-x-2" />
            <div className="flex flex-1 flex-row justify-center">
              <IconPicker value={iconChecked} onChange={(iconChecked) => change({ iconChecked })} />
              <ColorPicker value={iconCheckedColor} onChange={(iconCheckedColor) => change({ iconCheckedColor })} />
            </div>
          </div>
          <div className="flex flex-row items-center border-2 border-slate-200 rounded-lg">
            <FontAwesomeIcon icon={faCircle} className="text-slate-500 -translate-x-2" />
            <div className="flex flex-1 flex-row justify-center">
              <IconPicker value={iconUnChecked} onChange={(iconUnChecked) => change({ iconUnChecked })} />
              <ColorPicker
                value={iconUnCheckedColor}
                onChange={(iconUnCheckedColor) => change({ iconUnCheckedColor })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
