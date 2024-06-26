import { TUser } from "./TUser";

export type TPlaning = {
  _id: string;
  title: string;
  users: TUser[];
  masters: TUser[];
};

export enum StoryStatus {
  IDLE = "IDLE",
  WAITING = "WAITING",
  VOTING = "VOTING",
  FINISHED = "FINISHED",
  SKIPPED = "SKIPPED",
}

export type TRoom = {
  _id: string;
  name: string;
  url: string;
  users: TUser[];
};

export type TVote = {
  user: string;
  value: number;
  at?: number;
};

export type TStory = {
  _id: string;
  title: string;
  planing: string;
  status?: StoryStatus;
  votes?: TVote[];
  startAt?: number;
  isCurrent: boolean;
};

export enum VoteStatus {
  WAITING = "WAITING",
  VOTING = "VOTING",
  FINISHED = "FINISHED",
}
