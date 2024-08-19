import React from "react";
import { TControlSettingProps } from "../ControlSetting";
import { useSetSettingControl } from "../hooks";
import { TControlSetting } from "@/types/control";
import Heading from "./Heading";
import { IconKeys } from "@/constants/icon";
import IconPicker from "../../IconPicker";
import ColorPicker from "../../ColorPicker";
import { AllColors } from "@/constants/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../button/IconButton";
import Input from "../../Input";
import { useList } from "react-use";
import Checkbox from "../../Checkbox";
import { v4 } from "uuid";

export const OptionDefaultSetting = {
  choices: [],
  iconChecked: IconKeys.CircleChecked,
  iconUnChecked: IconKeys.Circle,
  iconCheckedColor: AllColors.DarkGreen,
  iconUnCheckedColor: AllColors.LightGray,
  multiple: false,
} as Exclude<TControlSetting["options"], undefined>;

export default function OptionSetting(props: TControlSettingProps) {
  const [text, setText] = React.useState("");
  const updateControlSetting = useSetSettingControl(props.id);

  const options = { ...OptionDefaultSetting, ...props.data.options };
  const { multiple } = options;
  const choices = options.choices || [];

  const change = (params: Partial<TControlSetting["options"]>) => {
    updateControlSetting({ options: { ...options, ...params } });
  };

  const handleAddChoice = () => {
    if (text) {
      const newChoices = [...choices, { label: text, value: v4() }];
      change({ choices: newChoices });
      setText("");
    }
  };

  const handleUpdateChoice = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = { label: value, value: newChoices[index].value };
    change({ choices: newChoices });
  };

  const handleDelete = (index: number) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    change({ choices: newChoices });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddChoice();
    }
  };

  return (
    <div className="p-2">
      <Heading label="Options" />
      <div className="p-2">
        <div className="flex flex-col py-2 text-sm">
          <Checkbox label="Multiple choices" checked={multiple} onChange={(multiple) => change({ multiple })} />
        </div>
        <div className="flex flex-col gap-2 py-2">
          {choices.map((choice, index) => (
            <div key={index} className="flex flex-row gap-2 items-center">
              <Input
                placeholder="Choice"
                value={choice.label}
                labelProps={{ className: "hidden" }}
                onChange={(e) => handleUpdateChoice(index, e.target.value)}
              />
              <IconButton icon={faTrash} onClick={() => handleDelete(index)} />
            </div>
          ))}
          <div className="flex flex-row gap-2 items-center text-sm text-slate-500">
            <Input
              value={text}
              placeholder="Choice"
              onKeyDown={handleKeyDown}
              onChange={(e) => setText(e.target.value)}
            />
            <IconButton icon={faPlus} onClick={handleAddChoice} />
          </div>
        </div>
      </div>
    </div>
  );
}
