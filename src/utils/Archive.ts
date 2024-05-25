import { saveAs } from "file-saver";

export default class Archive {
  static download(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    saveAs(blob, filename);
  }

  static async readJsonFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (event) => {
        reject(event.target?.error);
      };
      reader.readAsText(file);
    });
  }
}
