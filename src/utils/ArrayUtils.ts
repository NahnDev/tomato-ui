export default class ArrayUtils {
  public static replace<T extends { id: string }>(arr: T[], obj: T) {
    return arr.map((item) => (item.id === obj.id ? obj : item));
  }
}
