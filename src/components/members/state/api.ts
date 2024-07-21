import { axiosInstance } from "@/api/axios";

export default class MemberApi {
  static async getMembers() {
    const response = await axiosInstance.get("/users");
    return response.data;
  }
}
