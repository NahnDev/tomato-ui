import React, { useMemo } from "react";
import InputWrapper from "../../InputWrapper";
import { Input, Slider, Typography } from "@material-tailwind/react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import IconButton from "../../button/IconButton";
import { faAlignCenter, faAlignLeft, faAlignRight, faBold, faN } from "@fortawesome/free-solid-svg-icons";
import { TControlSetting } from "@/types/control";
import ColorPicker from "../../ColorPicker";

export const TextStyleDefaultSetting = {
  fontSize: 12,
  color: "#000000",
  fontWeight: 400,
  textAlign: "left",
} as TControlSetting["textStyles"];

export default function TextStyleSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const textStyles = useMemo(() => ({ ...TextStyleDefaultSetting, ...props.data.textStyles }), [props]);

  const updateStyles = (params: Partial<TControlSetting["textStyles"]>) => {
    updateControlSetting({ textStyles: { ...textStyles, ...params } });
  };
  return (
    <div className="p-2">
      <div className="p-2 pb-6">
        <div className="preview h-20 rounded-lg flex items-center justify-center bg-slate-200">
          <span className="w-full px-2" style={textStyles}>
            Text styles
          </span>
        </div>
      </div>
      <div className="p-2 flex flex-row gap-2 items-center justify-between h-10">
        <Input
          containerProps={{ className: "!min-w-0 max-w-20 hidden-arrow" }}
          className="text-center"
          label="Fontsize"
          type="number"
          step={1}
          min={12}
          max={48}
          value={textStyles?.fontSize}
          onChange={(e) => updateStyles({ fontSize: +e.target.value })}
        ></Input>

        <div className="flex flex-row gap-2 items-center">
          <ColorPicker value={textStyles.color} onChange={(color) => updateStyles({ color })} />
          <IconButton
            active={textStyles?.fontWeight === 700}
            icon={faBold}
            onClick={() => updateStyles({ fontWeight: textStyles.fontWeight === 700 ? 400 : 700 })}
          />
        </div>
        <div className="flex flex-row gap-2">
          <IconButton
            active={textStyles?.textAlign === "center"}
            icon={faAlignCenter}
            onClick={() => updateStyles({ textAlign: "center" })}
          />
          <IconButton
            active={textStyles?.textAlign === "left"}
            icon={faAlignLeft}
            onClick={() => updateStyles({ textAlign: "left" })}
          />
          <IconButton
            active={textStyles?.textAlign === "right"}
            icon={faAlignRight}
            onClick={() => updateStyles({ textAlign: "right" })}
          />
        </div>
      </div>
    </div>
  );
}
