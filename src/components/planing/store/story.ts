import PlaningApi from "@/api/PlaningApi";
import StoryApi from "@/api/StoryApi";
import useQueryParam from "@/hooks/useQueryParam";
import { StoryStatus, TPlaning, TStory } from "@/types/plan";
import { atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import { version } from "../edition/stories";

export const currentStory = atomFamily({
  key: "currentStory",
  default: selectorFamily({
    key: "currentStory/default",
    get: (id: string) => async () => {
      const data: TStory = await PlaningApi.getVoting(id);
      return data;
    },
  }),
});

export function useCurrentStory(planing: TPlaning) {
  return useRecoilValue(
    selectorFamily({
      key: "currentStory/getter",
      get:
        (id: string) =>
        ({ get }) =>
          get(currentStory(id)),
    })(planing._id)
  );
}

export function useCurrentStoryHandler(planing: string) {
  const start = useRecoilCallback(({ set }) => async () => {
    const story = await PlaningApi.updateStatus(planing, StoryStatus.VOTING);
    set(currentStory(planing), story);
    return story;
  });

  const finish = useRecoilCallback(({ set }) => async () => {
    const story = await PlaningApi.updateStatus(planing, StoryStatus.FINISHED);
    set(currentStory(planing), story);
    return story;
  });

  const reset = useRecoilCallback(({ set }) => async () => {
    const story = await PlaningApi.updateStatus(planing, StoryStatus.WAITING);
    set(currentStory(planing), story);
    return story;
  });

  const vote = useRecoilCallback(({ set }) => async (value: number) => {
    const story = await PlaningApi.vote(planing, value);
    set(currentStory(planing), story);
    return story;
  });

  const focus = useRecoilCallback(({ set }) => async (storyId: string) => {
    const story = await PlaningApi.focus(planing, storyId);
    set(currentStory(planing), story);
    set(version(planing), (v) => v + 1);
    return story;
  });

  const next = useRecoilCallback(({ set }) => async () => {
    const story = await PlaningApi.next(planing);
    set(currentStory(planing), story);
    return story;
  });

  const skip = useRecoilCallback(({ set }) => async () => {
    const story = await PlaningApi.skip(planing);
    set(currentStory(planing), story);
    return story;
  });

  return { start, finish, reset, skip, vote, focus, next };
}
