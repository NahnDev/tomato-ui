import { useMemo, useState } from "react";
import PlanningCard from "./PlanningCard";
import PlanningVote from "./PlanningVote";
import PlanningVoteSumarize from "./PlanningVoteSumarize";
import { StoryStatus, TPlanning } from "@/types/plan";
import { useCurrentStory, useCurrentStoryHandler } from "./store/story";
import { useStoryUpdateHandler } from "./edition/stories";

export type TPlanningStoryProps = {
  planning: TPlanning;
};

export default function PlanningStory(props: TPlanningStoryProps) {
  const story = useCurrentStory(props.planning);
  const { vote } = useCurrentStoryHandler(props.planning._id);
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
            <PlanningVoteSumarize story={story} />
          ) : (
            <PlanningCard story={story} onVote={handleVote} />
          )}
        </div>
      </div>
      <PlanningVote story={story} planning={props.planning} />
    </div>
  );
}
