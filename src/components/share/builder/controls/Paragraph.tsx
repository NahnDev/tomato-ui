import React, { useMemo } from "react";
import { ControlProps } from "../types";
import { marked } from "marked";
import { TextStyleDefaultSetting } from "../settings/TextStyleSetting";

const Paragraph: React.FC<ControlProps> = (props) => {
  const textStyle = useMemo(() => ({ ...TextStyleDefaultSetting, ...props.control.config.textStyles }), [props]);
  return (
    <div className="h-full w-full flex items-center justify-center">
      <span
        className="w-full px-2 h-full overflow-auto"
        style={textStyle}
        dangerouslySetInnerHTML={{ __html: props.control.config.label ?? "" }}
      />
    </div>
  );
};

export default Paragraph;
