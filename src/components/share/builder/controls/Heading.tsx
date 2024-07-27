import React, { useMemo } from "react";
import { ControlProps } from "../types";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { documentControls } from "../state/store";
import { ControlType } from "@/constants/control";
import IndexBullet from "@/utils/IndexBullet";

export default function Heading(props: ControlProps) {
  const controls = useRecoilValue(documentControls);
  const level = useMemo(() => props.control.config.heading?.level ?? 1, [props]);
  const format = useMemo(() => props.control.config.heading?.format ?? "", [props]);
  const backgroundColor = useMemo(() => props.control.config.heading?.color ?? "#000", [props]);
  const paddingLeft = useMemo(() => `${level * 2 + 4}em`, [level]);

  const bullets = useMemo(() => {
    const headingControls = controls.filter((control) => control.type === ControlType.Heading);
    const headingSorted = headingControls.sort((a, b) => a.coord.y - b.coord.y);
    const findIndex = headingSorted.findIndex((control) => control.id === props.control.id);
    const headingSliced = headingSorted.slice(0, findIndex + 1);

    return headingSliced.reduce((mapping, control) => {
      const level = control.config.heading?.level ?? 1;
      return [...new Array(level)].map((_, i) => (mapping[i] ?? 0) + (i + 1 === level ? 1 : 0));
    }, [] as number[]);
  }, [controls, props.control]);

  const bulletStr = useMemo(() => {
    const regex = new RegExp([...Array(level)].map((el) => "([^']+)").join("."));
    const str = bullets.map((index, level) => IndexBullet.getIndex(level + 1, index)).join(".");
    return str.replace(regex, format);
  }, [bullets, format, level]);

  return (
    <div className={clsx(["h-full w-full flex items-center justify-end gap-2"])} style={{ paddingLeft }}>
      <div
        className={clsx([
          "relative rounded-full w-8 h-8 ",
          "flex flex-row justify-center items-center text-white text-sm font-bold z-10",
        ])}
        style={{ backgroundColor }}
      >
        <div
          className="w-screen h-full absolute right-1/2 -z-10 flex flex-row justify-end items-center"
          style={{ backgroundColor }}
        >
          <span>{bulletStr}</span>
        </div>
      </div>
      <div className="w-full" style={props.control.config.textStyles ?? {}}>
        {props.control.config.label}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
