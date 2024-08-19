import { Checkbox as MTCheckbox, Typography } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { ControlProps } from "../types";
import { TextStyleDefaultSetting } from "../settings/TextStyleSetting";
import Checkbox from "../../Checkbox";
import { PrefixDefaultSetting } from "../settings/PrefixSetting";

export default function SingleCheckbox(props: ControlProps) {
  const [checked, setChecked] = useState<any>();
  const label = useMemo(() => props.control.config.label ?? "", [props]);
  const textStyleSetting = useMemo(() => ({ ...TextStyleDefaultSetting, ...props.control.config.textStyles }), [props]);
  const prefixSetting = useMemo(() => ({ ...PrefixDefaultSetting, ...props.control.config.prefix }), [props]);
  return (
    <div className="">
      <Checkbox
        style={textStyleSetting}
        label={label}
        checked={checked}
        onChange={(e) => setChecked(!checked)}
      ></Checkbox>
    </div>
  );
}
