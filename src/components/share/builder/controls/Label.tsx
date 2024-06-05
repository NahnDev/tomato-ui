import React from "react";
import { ControlProps } from "../types";

const Label: React.FC<ControlProps> = (props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <span className="w-full px-2" style={props.control.config.textStyles ?? {}}>
        {props.control.config.label}
      </span>
    </div>
  );
};

export default Label;
