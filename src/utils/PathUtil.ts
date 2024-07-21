import { SERVER_URL } from "@/constants/env";

export default class PathUtil {
  static getPublicPath(relativePath: string) {
    return `${SERVER_URL}/${relativePath}`;
  }
}
