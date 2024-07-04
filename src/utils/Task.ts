import { v4 as uuidV4 } from "uuid";

export type Task = { id: string; desc: string };

export class TaskFactory {
  static create(desc: string) {
    return { id: uuidV4(), desc } as Task;
  }
}
