export enum TStatus {
  Waiting = "waiting",
  Voting = "voting",
  Finished = "finished",
}

export type TRoom = {
  id: string;
  name: string;
  url: string;
  users: TUser[];
};

export type TUser = {
  id: string;
  name: string;
};

export type TVote = {
  userId: string;
  value: number;
};

export type TStory = {
  id: string;
  title: string;
  finished?: boolean;
  votes?: TVote[];
};
