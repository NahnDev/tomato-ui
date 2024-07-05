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

export function useStoryCreateHandler(planing: TPlaning["_id"], callback: (story: TStory) => void) {
  const refresh = useRefreshPlaningStories(planing);
  const { wrapper } = useTaskWrapper("stories", "Creating story");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async () => {
      if (!planing) return;
      const payload = { title: "New story", planing };
      const story = await StoryApi.create(payload);
      set(storiesState(planing), (s) => ({ ...s, data: [...s.data, story] }));
      refresh();
      callback(story);
    })
  );
}

export function useStoryUpdateHandler(planing: TPlaning["_id"], callback: () => void) {
  const { wrapper } = useTaskWrapper("stories", "Saving");
  const refresh = useRefreshPlaningStories(planing);
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (storyId: string, payload: Partial<Pick<TStory, "title">>) => {
      const stories = await snapshot.getPromise(storiesState(planing));
      set(storiesState(planing), {
        ...stories,
        data: stories.data.map((s) => (s._id === storyId ? { ...s, ...payload } : s)),
      });
      await StoryApi.updateOne(storyId, payload);
      refresh();
      callback();
    })
  );
}

export function useStoryDeleteHandler(planing: TPlaning["_id"], callback: () => void) {
  return useRecoilCallback(({ set, snapshot }) => async (storyId: string) => {
    await StoryApi.deleteOne(storyId);
    const stories = await snapshot.getPromise(storiesState(planing));
    set(storiesState(planing), { ...stories, data: stories.data.filter((s) => s._id !== storyId) });
    callback();
  });
}

export function useStorySortHandler(planing: TPlaning["_id"], callback: () => void) {
  const { wrapper } = useTaskWrapper("stories", "Sorting");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (ids: string[]) => {
      const stories = await snapshot.getPromise(storiesState(planing));
      const data = ids.map((id, order) => ({ ...stories.data.find((s) => s._id === id)!, order }));
      set(storiesState(planing), { ...stories, data });
      await StoryApi.sortStories(planing, ids);
      callback();
    })
  );
}

export function useRefreshPlaningStories(planing: TPlaning["_id"]) {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const data = await StoryApi.getByPlan(planing);
    snapshot.getPromise(version(planing));
    set(storiesState(planing), (prev) => ({ ...prev, data }));
  });
}
