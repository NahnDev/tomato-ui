import { atom, useRecoilState, useRecoilValue } from "recoil";
import { TStory } from "./type";
import { v4 as uuidV4 } from "uuid";
import { useCallback } from "react";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const storiesAtom = atom<TStory[]>({
  key: "storiesAtom",
  default: [] as TStory[],
  effects_UNSTABLE: [persistAtom],
});

export const currentStoryAtom = atom({
  key: "currentStoryAtom",
  default: null as TStory["id"] | null,
});

export function useCurrentStory() {
  const stories = useRecoilValue(storiesAtom);
  const [selected, setSelected] = useRecoilState(currentStoryAtom);

  const currentStory = stories.find((s) => s.id === selected);
  const selectStory = useCallback((story: TStory) => setSelected(story.id), [setSelected]);

  return [currentStory, selectStory] as [TStory | null, typeof selectStory];
}

export function useStories() {
  const [stories, setStories] = useRecoilState(storiesAtom);

  const createOrUpdateStory = useCallback(
    (story: Partial<TStory>) => {
      const index = stories.findIndex((s) => s.id === story.id);
      if (index === -1) {
        setStories([...stories, { id: uuidV4(), title: "", ...story }]);
      } else {
        setStories([...stories.slice(0, index), story as TStory, ...stories.slice(index + 1)]);
      }
    },
    [stories, setStories]
  );

  const removeStory = useCallback(
    (id: TStory["id"]) => {
      setStories(stories.filter((s) => s.id !== id));
    },
    [stories, setStories]
  );

  return [stories, createOrUpdateStory, removeStory] as [TStory[], typeof createOrUpdateStory, typeof removeStory];
}
