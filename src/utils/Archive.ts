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

  static async print() {
    const divHtml = document.getElementById("builder")?.innerHTML;
    if (!divHtml) {
      return;
    }
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow?.document.open();
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${divHtml}
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  }
}
