import { TPlaning, TStory } from "@/types/plan";
import { atomFamily, selectorFamily, useRecoilCallback, useRecoilValue, useRecoilValueLoadable } from "recoil";
import StoryApi from "@/api/StoryApi";
import { useTaskWrapper, useTasks } from "@/state/task/taskAtom";

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

export function useStoryCreateHandler(planing: TPlaning["_id"], callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  const { wrapper } = useTaskWrapper("stories", "Creating story");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (payload: Pick<TStory, "title">) => {
      if (!planing) return;
      const story = await StoryApi.create({ ...payload, planing: planing });
      set(storiesState(planing), (s) => ({ ...s, data: [...s.data, story] }));
      refresh();
      callback();
    })
  );
}

export function useStoryUpdateHandler(planing: TPlaning["_id"], callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (storyId: string, payload: Partial<Pick<TStory, "title">>) => {
    await StoryApi.updateOne(storyId, payload);
    const stories = await snapshot.getPromise(storiesState(planing));
    set(storiesState(planing), {
      ...stories,
      data: stories.data.map((s) => (s._id === storyId ? { ...s, ...payload } : s)),
    });
    refresh();
    callback();
  });
}

export function useStoryDeleteHandler(planing: TPlaning["_id"], callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (storyId: string) => {
    await StoryApi.deleteOne(storyId);
    const stories = await snapshot.getPromise(storiesState(planing));
    set(storiesState(planing), { ...stories, data: stories.data.filter((s) => s._id !== storyId) });
    refresh();
    callback();
  });
}

export function useStoryStortHandler(planing: TPlaning["_id"], callback: () => void) {
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) => async (ids: string[]) => {
    await StoryApi.sortStories(planing, ids);
    const stories = await snapshot.getPromise(storiesState(planing));
    const data = ids.map((id) => stories.data.find((s) => s._id === id)!);
    set(storiesState(planing), { ...stories, data });
    refresh();
    callback();
  });
}

export function useRefreshPlaningStories(planing: TPlaning["_id"]) {
  return useRecoilCallback(({ set }) => async () => {
    const data = await StoryApi.getByPlan(planing);
    set(storiesState(planing), (prev) => ({ ...prev, data }));
  });
}
