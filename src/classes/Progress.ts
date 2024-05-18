import { v4 as uuidv4 } from "uuid";

export default class Progress {
  private id: string;
  private at: Date;
  constructor() {
    this.id = uuidv4();
    this.at = new Date();
  }

  public getId() {
    return this.id;
  }

  public toJson() {
    return {
      id: this.id,
      at: this.at.toISOString(),
    };
  }

  public static compare(a: Progress, b: Progress) {
    return a.getId() === b.getId();
  }
}
