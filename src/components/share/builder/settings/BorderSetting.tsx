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

export const BorderDefaultSetting = {
  borderWidth: 0,
  borderColor: "#ff0000",
  borderRadius: 8,
} as Exclude<TControlSetting["border"], undefined>;

export default function BorderSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const boxStyles = useMemo(() => ({ ...BorderDefaultSetting, ...props.data.border }), [props]);

  const updateStyles = (params: Partial<TControlSetting["border"]>) => {
    updateControlSetting({ border: { ...boxStyles, ...params } });
  };
  return (
    <div className="p-2">
      <Heading label="Border" />
      <div className="p-2 flex flex-row gap-2 items-center justify-between h-10">
        <div className="flex flex-row gap-2">
          <ColorPicker value={boxStyles.borderColor} onChange={(borderColor) => updateStyles({ borderColor })} />
          <Input
            containerProps={{ className: "!min-w-0 max-w-20 hidden-arrow" }}
            className="text-center"
            label="Size"
            type="number"
            step={1}
            min={0}
            max={48}
            value={boxStyles?.borderWidth}
            onChange={(e) => updateStyles({ borderWidth: +e.target.value })}
          ></Input>
          <Input
            containerProps={{ className: "!min-w-0 max-w-20 hidden-arrow" }}
            className="text-center"
            label="Radius"
            type="number"
            step={4}
            min={0}
            max={48}
            value={boxStyles?.borderRadius}
            onChange={(e) => updateStyles({ borderRadius: +e.target.value })}
          ></Input>
        </div>
      </div>
    </div>
  );
}
