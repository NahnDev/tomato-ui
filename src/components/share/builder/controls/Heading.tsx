import React, { useMemo } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { builderControlsState } from "../store";
import { ControlType } from "@/constants/control";
import IndexBullet from "@/utils/IndexBullet";

export default function Heading(props: ControlProps) {
  const controls = useRecoilValue(builderControlsState);
  const index = useMemo(() => {
    const headingControls = controls.filter(
      (control) => control.type === ControlType.Heading && control.config.level === props.control.config.level
    );
    return headingControls.map((control) => control.coord.y).findIndex((y) => y === props.control.coord.y);
  }, [controls, props.control]);

  const bullet = useMemo(
    () => IndexBullet.getIndex(props.control.config.level ?? 1, index + 1),
    [props.control.config.level, index]
  );

  return (
    <div className="h-full w-full flex items-center justify-center gap-2 pl-10">
      <div
        className={clsx([
          "relative rounded-full w-6 h-6 ",
          "flex flex-row justify-center items-center text-white text-sm font-bold z-10",
        ])}
        style={{ backgroundColor: props.control.config.background ?? "#000" }}
      >
        <div
          className="w-[20em] h-full absolute right-1/2 -z-10"
          style={{ backgroundColor: props.control.config.background ?? "#000" }}
        ></div>
        {bullet}.
      </div>
      <span style={props.control.config.textStyles ?? {}}>{props.control.config.label}</span>
      <div className="flex-1"></div>
    </div>
  );
}
