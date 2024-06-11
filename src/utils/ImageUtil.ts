type Size = { width: number; height: number };

export default class ImageUtil {
  static async getImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = URL.createObjectURL(file);
    });
  }
}
