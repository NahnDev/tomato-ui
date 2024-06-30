import { TPlaning, TStory } from "@/types/plan";
import { atomFamily, selectorFamily, useRecoilCallback, useRecoilValue, useRecoilValueLoadable } from "recoil";
import StoryApi from "@/api/StoryApi";
import ApiStatus from "@/enums/ApiStatus";

export type TStoryState = { data: TStory[] };

export const version = atomFamily({ key: "stories/version", default: 0 });
export const storiesState = atomFamily({
  key: "stories",
  default: selectorFamily<TStoryState, string>({
    key: "stories/default",
    get:
      (planId) =>
      async ({ get }) => {
        get(version(planId));
        const data = await StoryApi.getByPlan(planId);
        return { data };
      },
  }),
});

export function useStories(planing: TPlaning) {
  return useRecoilValue(storiesState(planing._id)).data;
}

export function useStoryCreateHandler(planing: TPlaning, callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (payload: Pick<TStory, "title">) => {
    if (!planing) return;
    const story = await StoryApi.create({ ...payload, planing: planing._id });
    set(storiesState(planing._id), (s) => ({ ...s, data: [...s.data, story] }));
    refresh();
    callback();
  });
}

export function useStoryUpdateHandler(planing: TPlaning, callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (storyId: string, payload: Partial<Pick<TStory, "title">>) => {
    await StoryApi.updateOne(storyId, payload);
    const stories = await snapshot.getPromise(storiesState(planing._id));
    set(storiesState(planing._id), {
      ...stories,
      data: stories.data.map((s) => (s._id === storyId ? { ...s, ...payload } : s)),
    });
    refresh();
    callback();
  });
}

export function useStoryDeleteHandler(planing: TPlaning, callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (storyId: string) => {
    await StoryApi.deleteOne(storyId);
    const stories = await snapshot.getPromise(storiesState(planing._id));
    set(storiesState(planing._id), { ...stories, data: stories.data.filter((s) => s._id !== storyId) });
    refresh();
    callback();
  });
}

export function useStoryStortHandler(planing: TPlaning, callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (ids: string[]) => {
    await StoryApi.sortStories(planing._id, ids);
    const stories = await snapshot.getPromise(storiesState(planing._id));
    const data = ids.map((id) => stories.data.find((s) => s._id === id)!);
    set(storiesState(planing._id), { ...stories, data });
    refresh();
    callback();
  });
}

export function useRefreshPlaningStories(planing: TPlaning) {
  return useRecoilCallback(({ set }) => async () => {
    set(version(planing._id), (v) => v + 1);
  });
}
