import { StoryStatus, TPlanning, TStory } from "@/types/plan";
import { axiosInstance } from "./axios";
import { current } from "tailwindcss/colors";

export type TCreatePlanDto = Pick<TPlanning, "title">;
export type TUpdatePlanDto = Pick<TPlanning, "title">;
export type TAddStoryDto = Pick<TStory, "title">;

export default class PlanningApi {
  static async getAll() {
    const response = await axiosInstance.get("/plannings");
    return response.data as TPlanning[];
  }

  static async getOne(id: string) {
    const response = await axiosInstance.get(`/plannings/${id}`);
    return response.data;
  }

  static async create(payload: TCreatePlanDto) {
    const response = await axiosInstance.post("/plannings", payload);
    return response.data as TPlanning;
  }

  static async update(id: TPlanning["_id"], payload: TUpdatePlanDto) {
    const response = await axiosInstance.put(`/plannings/${id}`, payload);
    return response.data as TPlanning;
  }

  static async getVoting(planning: string) {
    const response = await axiosInstance.get(`/plannings/${planning}/voting`);
    return response.data;
  }

  static async updateStatus(planning: string, status: StoryStatus) {
    const response = await axiosInstance.put(`/plannings/${planning}/voting`, { status });
    return response.data;
  }

  static async vote(planning: string, value: number) {
    const response = await axiosInstance.post(`/plannings/${planning}/voting/votes`, { value });
    return response.data as TStory;
  }

  static async focus(planning: string, story: string) {
    const response = await axiosInstance.post(`/plannings/${planning}/voting`, { story });
    return response.data as TStory;
  }

  static async next(planning: string) {
    const response = await axiosInstance.post(`/plannings/${planning}/voting/actions/next`);
    return response.data as TStory;
  }
  static async skip(planning: string) {
    const response = await axiosInstance.post(`/plannings/${planning}/voting/actions/skip`);
    return response.data as TStory;
  }

  static async importFromCsv(id: string, payload: { resource: string; column: string }) {
    const response = await axiosInstance.post(`/plannings/${id}/import`, payload);
    return response.data as TStory[];
  }
}
