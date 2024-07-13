import { StoryStatus, TStory } from "@/types/plan";
import { axiosInstance } from "./axios";

export type CreateStoryDto = { title: string; planning: string };
export type UpdateStoryDto = { title?: string; status?: StoryStatus };

export default class StoryApi {
  static async getByPlan(planning: string) {
    const response = await axiosInstance.get(`/stories`, { params: { planning } });
    return response.data;
  }

  static async sortStories(planning: string, ids: string[]) {
    const response = await axiosInstance.put(`/stories`, { sort: ids }, { params: { planning } });
    return response.data;
  }

  static async create(payload: CreateStoryDto) {
    const response = await axiosInstance.post(`/stories`, payload);
    return response.data;
  }

  static async getOne(id: string) {
    const response = await axiosInstance.get(`/stories/${id}`);
    return response.data;
  }

  static async updateOne(id: string, payload: UpdateStoryDto) {
    const response = await axiosInstance.put(`/stories/${id}`, payload);
    return response.data;
  }

  static async deleteOne(id: string) {
    const response = await axiosInstance.delete(`/stories/${id}`);
    return response.data;
  }

  // static async getVotes(storyId: string) {
  //   const response = await axiosInstance.get(`/stories/${storyId}/votes`);
  //   return response.data;
  // }

  // static async vote(storyId: string, value: number) {
  //   const response = await axiosInstance.post(`/stories/${storyId}/votes`, { value });
  //   return response.data;
  // }

  // static async resetVotes(storyId: string) {
  //   const response = await axiosInstance.put(`/stories/${storyId}/votes`, { reset: true });
  //   return response.data;
  // }
}
