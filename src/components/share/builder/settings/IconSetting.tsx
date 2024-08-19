import React, { useMemo } from "react";
import InputWrapper from "../../InputWrapper";
import { Input, Slider, Typography } from "@material-tailwind/react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import IconButton from "../../button/IconButton";
import { faAlignCenter, faAlignLeft, faAlignRight, faBold, faN } from "@fortawesome/free-solid-svg-icons";
import { TBackground, TControlSetting } from "@/types/control";
import ColorPicker from "../../ColorPicker";
import Heading from "./Heading";
import IconPicker from "../../IconPicker";

export const IconDefaultSetting = {} as Exclude<TControlSetting["icons"], undefined>;

export default function IconSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const iconStyle = useMemo(() => ({ ...IconDefaultSetting, ...props.data.icons }), [props]);

  const updateStyles = (params: Partial<TControlSetting["icons"]>) => {
    updateControlSetting({ icons: { ...iconStyle, ...params } });
  };
  return (
    <div className="p-2">
      <Heading label="Icons" />
      <div className="p-2 flex flex-row gap-2 items-center justify-between h-10">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row gap-2 items-center">
            <h6 className="font-bold text-sm">Left:</h6>
            <ColorPicker value={iconStyle.leftColor} onChange={(leftColor) => updateStyles({ leftColor })} />
            <IconPicker value={iconStyle.left} onChange={(left) => updateStyles({ left })} />
          </div>

          <div className="flex flex-row gap-2 items-center">
            <h6 className="font-bold text-sm">Right:</h6>
            <ColorPicker value={iconStyle.rightColor} onChange={(rightColor) => updateStyles({ rightColor })} />
            <IconPicker value={iconStyle.right} onChange={(right) => updateStyles({ right })} />
          </div>
        </div>
      </div>
    </div>
  );
}
