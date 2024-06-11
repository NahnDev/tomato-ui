import React from "react";
import { useRecoilState } from "recoil";
import { CompactType, Mode, builderSettingsState } from "./store";
import { Checkbox, Input } from "@material-tailwind/react";
import IconButton from "../button/IconButton";
import { faArrowUpWideShort, faEdit, faGrip } from "@fortawesome/free-solid-svg-icons";

export default function BuilderInformation() {
  const [setting, setSetting] = useRecoilState(builderSettingsState);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row p-4 gap-2 items-center justify-around">
        <IconButton
          icon={faEdit}
          active={setting.mode === Mode.Edit}
          onClick={() => setSetting({ ...setting, mode: setting.mode !== Mode.Edit ? Mode.Edit : Mode.Preview })}
        />
        <div className="flex flex-row items-center gap-2">
          <IconButton
            icon={faArrowUpWideShort}
            active={setting.compactType === CompactType.Vertical}
            onClick={() => setSetting({ ...setting, compactType: CompactType.Vertical })}
          />
          <IconButton
            className="-rotate-90"
            icon={faArrowUpWideShort}
            active={setting.compactType === CompactType.Horizontal}
            desc="Allow left"
            onClick={() => setSetting({ ...setting, compactType: CompactType.Horizontal })}
          />

          <IconButton
            className="-rotate-90"
            icon={faGrip}
            active={setting.compactType === null}
            onClick={() => setSetting({ ...setting, compactType: null })}
          />
        </div>
        <Input
          containerProps={{ className: "!min-w-0 max-w-20 hidden-arrow" }}
          className="text-center"
          label="Grids"
          type="number"
          step={1}
          min={2}
          max={12}
          value={setting.grid.cols}
          onChange={(e) => setSetting({ ...setting, grid: { ...setting.grid, cols: Number(e.target.value) } })}
        ></Input>
      </div>
    </div>
  );
}
