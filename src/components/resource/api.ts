import { axiosInstance } from "@/api/axios";
import { TResourceItem, items } from "./seed";
import { AxiosProgressEvent } from "axios";

export type TCreateResourcePayload = Pick<TResourceItem, "title" | "directory">;
export type TUpdateResourcePayload = Partial<Pick<TResourceItem, "title" | "directory">>;

export default class ResourceApi {
  static async getByDirectory(directory?: string) {
    const response = await axiosInstance.get(`/resources`, { params: { directory } });
    return response.data;
  }

  static async create(payload: TCreateResourcePayload) {
    const response = await axiosInstance.post(`/resources`, payload);
    return response.data;
  }

  static async update(id: string, payload: TUpdateResourcePayload) {
    const response = await axiosInstance.put(`/resources/${id}`, payload);
    return response.data;
  }

  static async delete(id: string) {
    const response = await axiosInstance.delete(`/resources/${id}`);
    return response.data;
  }

  static async uploadFile(
    file: File,
    directory?: string,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(`/upload/`, formData, {
      params: { directory },
      onUploadProgress,
      timeout: 180 * 1000,
    });
    return response.data;
  }
}
