import React from "react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import { Input } from "@material-tailwind/react";

export default function BaseSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  return (
    <div className="p-2">
      <Input label="Label" value={props.data.label} onChange={(e) => updateControlSetting({ label: e.target.value })} />
    </div>
  );
}
