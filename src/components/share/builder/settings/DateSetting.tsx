import { TControlSetting, TDateSetting } from "@/types/control";
import React, { useMemo } from "react";
import { useSetSettingControl } from "../hooks";
import { TControlSettingProps } from "../ControlSetting";
import { Input, Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const DefaultDateSetting: TControlSetting["date"] = {
  format: "DD/MM/YYYY",
};

export default function DateSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  const dateSettings = useMemo(() => props.data.date, [props]);

  const updateSetting = (value: Partial<TControlSetting["date"]>) => {
    updateControlSetting({ date: { ...dateSettings, ...value } });
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      <Input
        icon={<FormatPreview format={dateSettings?.format} />}
        label="Date format"
        value={dateSettings?.format ?? ""}
        onChange={(e) => updateControlSetting({ date: { ...dateSettings, format: e.target.value } })}
      />
      <div className="py-2 flex flex-col gap-2">
        <Input
          value={dateSettings?.minDate ?? ""}
          type="date"
          label="Min date"
          onChange={(e) =>
            updateSetting({ minDate: e.target.value ? moment(e.target.value).format("YYYY-MM-DD") : undefined })
          }
        />
        <Input
          value={dateSettings?.maxDate ?? ""}
          type="date"
          label="Max date"
          onChange={(e) =>
            updateSetting({ maxDate: e.target.value ? moment(e.target.value).format("YYYY-MM-DD") : undefined })
          }
        />
      </div>
    </div>
  );
}

function FormatPreview(props: Readonly<{ format: TDateSetting["format"] }>) {
  const str = useMemo(() => moment().format(props.format), [props.format]);
  return (
    <Tooltip content={str}>
      <FontAwesomeIcon icon={faInfoCircle} />
    </Tooltip>
  );
}
