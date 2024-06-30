import { TStory } from "@/types/plan";

export default class ArrayUtils {
  public static replace<T extends { id: string }>(arr: T[], obj: T) {
    return arr.map((item) => (item.id === obj.id ? obj : item));
  }

  public static store(data: TStory[], payload: TStory) {
    return data.map((story) => (story._id === payload._id ? { ...story, ...payload } : story));
  }
}
