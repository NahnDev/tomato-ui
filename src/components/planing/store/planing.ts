import { atom, atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import PlaningApi, { TCreatePlanDto } from "@/api/PlaningApi";
import { useParams } from "next/navigation";
import StoryApi from "@/api/StoryApi";
import { useCallback } from "react";
import { TPlaning } from "@/types/plan";
import { useAuth } from "@/state/auth/hook";

export const planingState = atom({
  key: "planings",
  default: selector({
    key: "planings/default",
    get: async () => {
      const data = (await PlaningApi.getAll()) as TPlaning[];
      return data;
    },
  }),
});

export function usePlanings() {
  return useRecoilValue(planingState);
}

export const currentPlaningState = atomFamily({
  key: "plan",
  default: selectorFamily({
    key: "plan/default",
    get: (id: string) => async () => {
      const data = (await PlaningApi.getOne(id)) as TPlaning;
      return data;
    },
  }),
});

export function useCurrentPlaning() {
  const { id } = useParams();
  return useRecoilValue(
    selectorFamily({
      key: "plan/current",
      get:
        (id: string) =>
        ({ get }) =>
          get(currentPlaningState(id)),
    })(id as string)
  );
}

export function usePlanUsers() {
  return useCurrentPlaning().users;
}

export function usePlaningCreateHandler(callback: (planing: TPlaning) => void) {
  return useRecoilCallback(({ set }) => async (data: TCreatePlanDto) => {
    const planing = await PlaningApi.create(data);
    set(planingState, (prev) => [...prev, planing]);
    callback(planing);
  });
}

export function useSetPlaningUser(planing: TPlaning) {
  return useRecoilCallback(({ set }) => async (users: TPlaning["users"]) => {
    set(currentPlaningState(planing._id), (prev) => ({ ...prev, users }));
  });
}
