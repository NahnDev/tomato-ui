import { axiosInstance } from "./axios";

export default class ResourceApi {
  static async getCsvHeader(id: string) {
    const response = await axiosInstance.get(`/csv/${id}/headers`);
    return response.data;
  }
}
