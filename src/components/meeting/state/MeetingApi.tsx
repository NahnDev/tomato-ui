import { axiosInstance } from "@/api/axios";
import { TMeeting } from "../type";

type TCreateMeetingDto = Pick<TMeeting, "name">;
type TUpdateMeetingDto = Pick<TMeeting, "name">;

export default class MeetingApi {
  static async getAll() {
    const response = await axiosInstance.get("/meetings");
    return response.data as TMeeting[];
  }

  static async getOne(id: string) {
    const response = await axiosInstance.get(`/meetings/${id}`);
    return response.data as TMeeting;
  }

  static async create(payload: TCreateMeetingDto) {
    const response = await axiosInstance.post("/meetings", payload);
    return response.data as TMeeting;
  }

  static async update(id: TMeeting["_id"], payload: TUpdateMeetingDto) {
    const response = await axiosInstance.put(`/meetings/${id}`, payload);
    return response.data as TMeeting;
  }

  static async delete(id: string) {
    const response = await axiosInstance.delete(`/meetings/${id}`);
    return response.data;
  }
}
