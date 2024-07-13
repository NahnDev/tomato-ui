"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { useAuth } from "@/state/auth/hook";
import { StoryStatus, TStory } from "@/types/plan";

export type TPlanningCardProps = {
  story: TStory;
  onVote: (value: number) => void;
};

export const POINTS = [1, 2, 3, 5, 8, 13, 20, 40, 100];

export default function PlanningCard(props: TPlanningCardProps) {
  const { user } = useAuth();
  const isVoteing = useMemo(() => props.story.status === StoryStatus.VOTING, [props.story.status]);
  const votes = useMemo(() => props.story.votes ?? [], [props.story.votes]);
  const vote = useMemo(() => votes.find((vote) => vote.user === user?._id), [votes, user]);

  return (
    <div
      className={clsx(["flex flex-row flex-wrap justify-center gap-4", !isVoteing && "pointer-events-none opacity-50"])}
    >
      {POINTS.map((value) => (
        <Card key={value} selected={vote?.value === value} pointer={value} onClick={() => props.onVote(value)} />
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
