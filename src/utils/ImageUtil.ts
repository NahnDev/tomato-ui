import { FileBase64 } from "@/types/file";

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

  static async toBase64(file: File): Promise<FileBase64> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          id: file.name,
          name: file.name,
          base64: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    });
  }
}
