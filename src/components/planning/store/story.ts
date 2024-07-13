import PlanningApi from "@/api/PlanningApi";
import StoryApi from "@/api/StoryApi";
import useQueryParam from "@/hooks/useQueryParam";
import { StoryStatus, TPlanning, TStory } from "@/types/plan";
import { atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import { useRefreshPlanningStories } from "../edition/stories";

export const currentStory = atomFamily({
  key: "currentStory",
  default: selectorFamily({
    key: "currentStory/default",
    get: (id: string) => async () => {
      const data: TStory = await PlanningApi.getVoting(id);
      return data;
    },
  }),
});

export function useCurrentStory(planning: TPlanning) {
  return useRecoilValue(
    selectorFamily({
      key: "currentStory/getter",
      get:
        (id: string) =>
        ({ get }) =>
          get(currentStory(id)),
    })(planning._id)
  );
}

export function useCurrentStoryHandler(planning: string) {
  const start = useRecoilCallback(({ set }) => async () => {
    const story = await PlanningApi.updateStatus(planning, StoryStatus.VOTING);
    set(currentStory(planning), story);
    return story;
  });

  const finish = useRecoilCallback(({ set }) => async () => {
    const story = await PlanningApi.updateStatus(planning, StoryStatus.FINISHED);
    set(currentStory(planning), story);
    return story;
  });

  const reset = useRecoilCallback(({ set }) => async () => {
    const story = await PlanningApi.updateStatus(planning, StoryStatus.WAITING);
    set(currentStory(planning), story);
    return story;
  });

  const vote = useRecoilCallback(({ set }) => async (value: number) => {
    const story = await PlanningApi.vote(planning, value);
    set(currentStory(planning), story);
    return story;
  });

  const refresh = useRefreshPlanningStories(planning);
  const focus = useRecoilCallback(({ set }) => async (storyId: string) => {
    const story = await PlanningApi.focus(planning, storyId);
    set(currentStory(planning), story);
    refresh();
    return story;
  });

  const next = useRecoilCallback(({ set }) => async () => {
    const story = await PlanningApi.next(planning);
    set(currentStory(planning), story);
    return story;
  });

  const skip = useRecoilCallback(({ set }) => async () => {
    const story = await PlanningApi.skip(planning);
    set(currentStory(planning), story);
    return story;
  });

  return { start, finish, reset, skip, vote, focus, next };
}
