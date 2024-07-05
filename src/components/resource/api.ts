import { axiosInstance } from "@/api/axios";
import { TResourceItem, items } from "./seed";

export default class ResourceApi {
  static async getByDirectory(directory: string) {
    return items.filter((item) => item.directory === directory);
    // const response = await axiosInstance.get(`/api/resources`, { params: { directory } });
    // return response.data;
  }

  static async create(payload: Pick<TResourceItem, "title">) {
    const response = await axiosInstance.post(`/api/resources`, payload);
    return response.data;
  }

  static async update(id: string, payload: Pick<TResourceItem, "title">) {
    const response = await axiosInstance.put(`/api/resources/${id}`, payload);
    return response.data;
  }

  static async delete(id: string) {
    const response = await axiosInstance.delete(`/api/resources/${id}`);
    return response.data;
  }
}
