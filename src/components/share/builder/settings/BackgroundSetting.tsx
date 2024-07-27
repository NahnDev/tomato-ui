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

export const BackgroundDefaultSetting = {
  backgroundColor: "#ff0000",
  borderWidth: 0,
  borderColor: "#ff0000",
  radius: 0,
} as Exclude<TControlSetting["background"], undefined>;

export default function BackgroundSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const boxStyles = useMemo(() => ({ ...BackgroundDefaultSetting, ...props.data.background }), [props]);

  const updateStyles = (params: Partial<TControlSetting["background"]>) => {
    updateControlSetting({ background: { ...boxStyles, ...params } });
  };
  return (
    <div className="p-2">
      <Heading label="Background" />
      <div className="p-2 flex flex-row gap-2 items-center justify-between h-10">
        <div className="flex flex-row gap-2">
          <ColorPicker
            value={boxStyles.backgroundColor}
            onChange={(backgroundColor) => updateStyles({ backgroundColor })}
          />
        </div>
      </div>
    </div>
  );
}
