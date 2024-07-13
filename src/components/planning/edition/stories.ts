import { TPlanning, TStory } from "@/types/plan";
import { atomFamily, selectorFamily, useRecoilCallback, useRecoilValue, useRecoilValueLoadable } from "recoil";
import StoryApi from "@/api/StoryApi";
import { useTaskWrapper, useTasks } from "@/state/task/taskAtom";
import PlanningApi from "@/api/PlanningApi";

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

export function useStories(planning: TPlanning) {
  return useRecoilValue(storiesState(planning._id)).data;
}

export function useStoryCreateHandler(planning: TPlanning["_id"], callback: (story: TStory) => void) {
  const refresh = useRefreshPlanningStories(planning);
  const { wrapper } = useTaskWrapper("stories", "Creating story");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async () => {
      if (!planning) return;
      const payload = { title: "New story", planning };
      const story = await StoryApi.create(payload);
      set(storiesState(planning), (s) => ({ ...s, data: [...s.data, story] }));
      refresh();
      callback(story);
    })
  );
}

export function useStoryUpdateHandler(planning: TPlanning["_id"], callback: () => void) {
  const { wrapper } = useTaskWrapper("stories", "Saving");
  const refresh = useRefreshPlanningStories(planning);
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (storyId: string, payload: Partial<Pick<TStory, "title">>) => {
      const stories = await snapshot.getPromise(storiesState(planning));
      set(storiesState(planning), {
        ...stories,
        data: stories.data.map((s) => (s._id === storyId ? { ...s, ...payload } : s)),
      });
      await StoryApi.updateOne(storyId, payload);
      refresh();
      callback();
    })
  );
}

export function useStoryDeleteHandler(planning: TPlanning["_id"], callback: () => void) {
  return useRecoilCallback(({ set, snapshot }) => async (storyId: string) => {
    await StoryApi.deleteOne(storyId);
    const stories = await snapshot.getPromise(storiesState(planning));
    set(storiesState(planning), { ...stories, data: stories.data.filter((s) => s._id !== storyId) });
    callback();
  });
}

export function useStorySortHandler(planning: TPlanning["_id"], callback: () => void) {
  const { wrapper } = useTaskWrapper("stories", "Sorting");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (ids: string[]) => {
      const stories = await snapshot.getPromise(storiesState(planning));
      const data = ids.map((id, order) => ({ ...stories.data.find((s) => s._id === id)!, order }));
      set(storiesState(planning), { ...stories, data });
      await StoryApi.sortStories(planning, ids);
      callback();
    })
  );
}

export function useStoryImportHandler(planning: TPlanning["_id"], callback: () => void) {
  const { wrapper } = useTaskWrapper("stories", "Importing");
  return useRecoilCallback(({ set, snapshot }) =>
    wrapper(async (resource: string, column: string) => {
      const state = await snapshot.getPromise(storiesState(planning));
      const newStories = await PlanningApi.importFromCsv(planning, { resource, column });
      set(storiesState(planning), {
        ...state,
        data: [...state.data, ...newStories],
      });
      callback();
    })
  );
}

export function useRefreshPlanningStories(planning: TPlanning["_id"]) {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    const data = await StoryApi.getByPlan(planning);
    snapshot.getPromise(version(planning));
    set(storiesState(planning), (prev) => ({ ...prev, data }));
  });
}
