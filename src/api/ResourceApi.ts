export default class ResourceApi {
  static async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return fetch("/api/resource/upload", {
      method: "POST",
      body: formData,
    });
  }
}
