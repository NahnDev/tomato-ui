import { useMemo, useState } from "react";
import PlaningCard from "./PlaningCard";
import PlaningVote from "./PlaningVote";
import PlaningVoteSumarize from "./PlaningVoteSumarize";
import { StoryStatus, TPlaning } from "@/types/plan";
import { useCurrentStory, useCurrentStoryHandler } from "./store/story";
import { useStoryUpdateHandler } from "./edition/stories";

export type TPlaningStoryProps = {
  planing: TPlaning;
};

export default function PlaningStory(props: TPlaningStoryProps) {
  const story = useCurrentStory(props.planing);
  const { vote } = useCurrentStoryHandler(props.planing._id);
  const handleVote = (value: number) => vote(value);

  if (!story) return <div className="fluid flex items-center justify-center text-slate-900">No story selected</div>;
  return (
    <div className="overflow-y-hidden grid grid-cols-[1fr_auto] h-full w-min mx-auto">
      <div className="w-[60vw]">
        <div className="p-8 text-center">
          <h4 className="text-center text-slate-900 text-2xl">{story?.title}</h4>
        </div>
        <div>
          {story.status === StoryStatus.FINISHED ? (
            <PlaningVoteSumarize story={story} />
          ) : (
            <PlaningCard story={story} onVote={handleVote} />
          )}
        </div>
      </div>
      <PlaningVote story={story} planing={props.planing} />
    </div>
  );
}
