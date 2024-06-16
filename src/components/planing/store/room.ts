import { atom, useSetRecoilState } from "recoil";
import { v4 as uuidV4 } from "uuid";

export type RoomState = {
  id: string;
  name: string;
  url: string;
  users: string[];
};

export const roomAtom = atom({
  key: "roomAtom",
  default: null as RoomState | null,
});

export function useRoomCreator() {
  const set = useSetRecoilState(roomAtom);
  return (name: string) => {
    const id = uuidV4();
    const room = { id, users: [], name, url: `/planing?room=${id}` };
    set(room);
    return room;
  };
}
