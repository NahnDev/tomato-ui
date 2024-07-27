import { Step } from "@/types/control";
import { selector, useRecoilCallback, useRecoilValue } from "recoil";
import { v4 } from "uuid";
import { document, state } from "./store";
import moment from "moment";

export class StepBuilder {
  private name?: string;
  private desc?: string;

  constructor() {}
  setName(name: string) {
    this.name = name;
    return this;
  }
  setDesc(desc: string) {
    this.desc = desc;
    return this;
  }
  build(): Step {
    return {
      id: v4(),
      name: this.name ?? "",
      desc: this.desc || "Using a custom hook",
      meta: `Created by ${moment().format("YYYY-MM-DD")}`,
    };
  }
}

export function useStepCreator() {
  return useRecoilCallback(({ set }) => async (name: string, desc: string) => {
    const step = new StepBuilder().setName(name).setDesc(desc).build();
    set(document, (doc) => ({ ...doc, steps: [...doc.steps, step] }));
    set(state, (s) => ({ ...s, step: step.id }));
  });
}

export function useStepUpdater() {
  return useRecoilCallback(({ set }) => async (step: Partial<Step>) => {
    set(document, (doc) => ({
      ...doc,
      steps: doc.steps.map((el) => (el.id === step.id ? { ...el, ...step } : el)),
    }));
  });
}

export function useStepDeleter() {
  return useRecoilCallback(({ set, snapshot }) => async (id: string) => {
    const steps = (await snapshot.getPromise(document)).steps;
    const nextSteps = steps.filter((el) => el.id !== id);
    const idx = steps.findIndex((el) => el.id === id);
    const nextIdx = nextSteps[idx] ? nextSteps.length - 1 : idx;
    set(document, (doc) => ({ ...doc, steps: nextSteps }));
    set(state, (s) => ({ ...s, step: nextSteps[nextIdx]?.id }));
  });
}

export function useStepReorder() {
  return useRecoilCallback(({ set }) => async (ids: string[]) => {
    set(document, (doc) => ({ ...doc, steps: ids.map((id) => doc.steps.find((el) => el.id === id)!) }));
  });
}

export function useStepSelector() {
  return useRecoilCallback(({ set }) => async (id: string) => {
    set(state, (s) => ({ ...s, step: id }));
  });
}

// hooks

export const stepSelector = selector({
  key: "stepSelector",
  get: ({ get }) => {
    const id = get(state).step;
    return get(document).steps.find((el) => el.id === id);
  },
});

export function useStepSelected() {
  return useRecoilValue(stepSelector);
}

export function useSteps() {
  return useRecoilValue(document).steps;
}
