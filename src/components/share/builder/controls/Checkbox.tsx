import { Checkbox as MTCheckbox, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ControlProps } from "../types";

export default function Checkbox(props: ControlProps) {
  const [checked, setChecked] = useState<any>();
  return (
    <div>
      <Typography className="px-2 text-blue-gray-400 text-sm">{props.control.config.label}</Typography>
      <div className="flex flex-row flex-wrap">
        {props.control.config.options.map((option, index) => (
          <MTCheckbox
            key={index}
            containerProps={{ className: "px-8 flex-1" }}
            style={{ backgroundColor: props.control.config.background }}
            label={option.label}
            value={option.value}
            onChange={(e) => setChecked(e.target.value)}
          ></MTCheckbox>
        ))}
      </div>
    </div>
  );
}
