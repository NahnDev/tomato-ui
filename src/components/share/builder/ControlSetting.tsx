import { ControlInterface } from "@/types/control";
import React, { useEffect } from "react";
import { useControlSelected, useDeleteControl, useSetControl, useSetSettingControl } from "./hooks";
import { IconButton, Input, List, ListItem } from "@material-tailwind/react";
import { faChevronCircleRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorPicker from "../ColorPicker";

export default function ControlSetting() {
  const [selected] = useControlSelected();
  return (
    <div className="">
      {selected && (
        <div key={selected.id}>
          <BaseControlSetting id={selected.id} data={selected.config} />
          <BackgroundSetting id={selected.id} data={selected.config} />
          <Actions control={selected}></Actions>
        </div>
      )}
    </div>
  );
}

export type TControlSettingProps = Readonly<{ id: ControlInterface["id"]; data: ControlInterface["config"] }>;
function BaseControlSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  return (
    <div className="p-2">
      <Input label="Label" value={props.data.label} onChange={(e) => updateControlSetting({ label: e.target.value })} />
    </div>
  );
}

function BackgroundSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  return (
    <div className="p-2">
      <ColorPicker
        label="Background"
        value={props.data.background}
        onChange={(color) => updateControlSetting({ background: color })}
      />
    </div>
  );
}

function Actions(props: Readonly<{ control: ControlInterface }>) {
  const deleteControl = useDeleteControl();
  return (
    <div className="p-1 w-full flex-row flex">
      <div className="flex-1"></div>
      <IconButton
        variant="text"
        className="rounded-full duration-200 text-red-500"
        onClick={() => deleteControl(props.control.id)}
      >
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
      </IconButton>
    </div>
  );
}
