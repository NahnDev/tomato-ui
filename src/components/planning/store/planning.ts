import { atom, atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilValue } from "recoil";
import PlanningApi, { TCreatePlanDto } from "@/api/PlanningApi";
import { useParams } from "next/navigation";
import StoryApi from "@/api/StoryApi";
import { useCallback } from "react";
import { TPlanning } from "@/types/plan";
import { useAuth } from "@/state/auth/hook";

export const planningState = atom({
  key: "plannings",
  default: selector({
    key: "plannings/default",
    get: async () => {
      const data = (await PlanningApi.getAll()) as TPlanning[];
      return data;
    },
  }),
});

export function usePlannings() {
  return useRecoilValue(planningState);
}

export const currentPlanningState = atomFamily({
  key: "plan",
  default: selectorFamily({
    key: "plan/default",
    get: (id: string) => async () => {
      const data = (await PlanningApi.getOne(id)) as TPlanning;
      return data;
    },
  }),
});

export function useCurrentPlanning() {
  const { id } = useParams();
  return useRecoilValue(
    selectorFamily({
      key: "plan/current",
      get:
        (id: string) =>
        ({ get }) =>
          get(currentPlanningState(id)),
    })(id as string)
  );
}

export function usePlanUsers() {
  return useCurrentPlanning().users;
}

export function usePlanningCreateHandler(callback: (planning: TPlanning) => void) {
  return useRecoilCallback(({ set }) => async (data: TCreatePlanDto) => {
    const planning = await PlanningApi.create(data);
    set(planningState, (prev) => [...prev, planning]);
    callback(planning);
  });
}

export function useSetPlanningUser(planning: TPlanning) {
  return useRecoilCallback(({ set }) => async (users: TPlanning["users"]) => {
    set(currentPlanningState(planning._id), (prev) => ({ ...prev, users }));
  });
}
