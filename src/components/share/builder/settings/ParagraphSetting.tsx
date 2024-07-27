import React from "react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import { Input, Textarea } from "@material-tailwind/react";
import ContentEditable from "react-contenteditable";
import Heading from "./Heading";

export default function ParagraphSetting(props: TControlSettingProps) {
  const updateControlSetting = useSetSettingControl(props.id);
  return (
    <div className="p-2">
      <Heading label="Paragraph" />
      <ContentEditable
        className="min-h-20 max-h-40 overflow-y-auto focus:outline-none border-2 border-gray-300 rounded-lg p-2 text-sm"
        html={props.data.label ?? ""}
        onChange={(e) => updateControlSetting({ label: e.target.value })}
      />
    </div>
  );
}
