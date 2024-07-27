import { Checkbox as MTCheckbox, Typography } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { ControlProps } from "../types";
import { TextStyleDefaultSetting } from "../settings/TextStyleSetting";

export default function Checkbox(props: ControlProps) {
  const [checked, setChecked] = useState<any>();
  const label = useMemo(() => props.control.config.label ?? "", [props]);
  const textStyleSetting = useMemo(() => ({ ...TextStyleDefaultSetting, ...props.control.config.textStyles }), [props]);
  return (
    <div>
      <MTCheckbox
        containerProps={{ className: "flex-1" }}
        style={{ backgroundColor: props.control.config.bg }}
        label={label}
        labelProps={{ style: textStyleSetting }}
        checked={checked}
        onChange={(e) => setChecked(!checked)}
      ></MTCheckbox>
    </div>
  );
}
