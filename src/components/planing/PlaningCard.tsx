"use client";

import clsx from "clsx";
import { useState } from "react";
import { TStatus } from "./store/type";

export type TPlaningCardProps = {
  status: TStatus;
};

export const POINTS = [1, 2, 3, 5, 8, 13, 20, 40, 100];

export default function PlaningCard(props: TPlaningCardProps) {
  const [selected, setSelected] = useState<number>();
  return (
    <div
      className={clsx([
        "flex flex-row flex-wrap justify-center gap-4",
        props.status === TStatus.Waiting && "pointer-events-none opacity-50",
      ])}
    >
      {POINTS.map((point) => (
        <Card key={point} selected={selected === point} pointer={point} onClick={() => setSelected(point)} />
      ))}
    </div>
  );
}

function Card(props: { pointer: number; selected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={props.onClick}
      className={clsx([
        "w-36 h-48 bg-white p-4",
        "rounded-lg border-2",
        !props.selected ? " border-slate-400" : " border-red-500",
        "cursor-pointer select-none",
      ])}
    >
      <div
        className={clsx([
          "w-full h-full flex flex-col justify-center items-center rounded-lg",
          props.selected ? "text-red-500 border-[1px] border-red-500" : "text-black",
        ])}
      >
        <div className="text-3xl font-semibold">{props.pointer}</div>
        <div className="text-sm">points</div>
      </div>
    </div>
  );
}
