import React, { useMemo } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";
import { Textarea } from "@material-tailwind/react";

export default function LongText(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return (
    <Textarea
      variant="static"
      rows={1}
      label={label}
      className="!min-h-0 scroll-none !pt-0"
      containerProps={{ className: "h-full pb-3 pt-0" }}
    ></Textarea>
  );
}
