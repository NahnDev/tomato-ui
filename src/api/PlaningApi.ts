import { StoryStatus, TPlaning, TStory } from "@/types/plan";
import { axiosInstance } from "./axios";
import { current } from "tailwindcss/colors";

export type TCreatePlanDto = Pick<TPlaning, "title">;
export type TUpdatePlanDto = Pick<TPlaning, "title">;
export type TAddStoryDto = Pick<TStory, "title">;

export default class PlaningApi {
  static async getAll() {
    const response = await axiosInstance.get("/planings");
    return response.data as TPlaning[];
  }

  static async getOne(id: string) {
    const response = await axiosInstance.get(`/planings/${id}`);
    return response.data;
  }

  static async create(payload: TCreatePlanDto) {
    const response = await axiosInstance.post("/planings", payload);
    return response.data as TPlaning;
  }

  static async update(id: TPlaning["_id"], payload: TUpdatePlanDto) {
    const response = await axiosInstance.put(`/planings/${id}`, payload);
    return response.data as TPlaning;
  }

  static async getVoting(planing: string) {
    const response = await axiosInstance.get(`/planings/${planing}/voting`);
    return response.data;
  }

  static async updateStatus(planing: string, status: StoryStatus) {
    const response = await axiosInstance.put(`/planings/${planing}/voting`, { status });
    return response.data;
  }

  static async vote(planing: string, value: number) {
    const response = await axiosInstance.post(`/planings/${planing}/voting/votes`, { value });
    return response.data as TStory;
  }

  static async focus(planing: string, story: string) {
    const response = await axiosInstance.post(`/planings/${planing}/voting`, { story });
    return response.data as TStory;
  }

  static async next(planing: string) {
    const response = await axiosInstance.post(`/planings/${planing}/voting/actions/next`);
    return response.data as TStory;
  }
  static async skip(planing: string) {
    const response = await axiosInstance.post(`/planings/${planing}/voting/actions/skip`);
    return response.data as TStory;
  }

  static async importFromCsv(id: string, payload: { resource: string; column: string }) {
    const response = await axiosInstance.post(`/planings/${id}/import`, payload);
    return response.data as TStory[];
  }
}
