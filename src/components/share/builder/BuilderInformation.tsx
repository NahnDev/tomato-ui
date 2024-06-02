import React from "react";
import { useRecoilState } from "recoil";
import { Mode, builderSettingsState } from "./store";
import { Checkbox } from "@material-tailwind/react";

export default function BuilderInformation() {
  const [setting, setSetting] = useRecoilState(builderSettingsState);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <Checkbox
          label="Allow editable"
          checked={setting.mode === Mode.Edit}
          onChange={(e) => setSetting({ ...setting, mode: e.target.checked ? Mode.Edit : Mode.Preview })}
        />
      </div>
    </div>
  );
}
