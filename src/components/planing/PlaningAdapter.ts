import { v4 as uuidV4 } from "uuid";
import { roomAtom } from "./store/room";
import { Peer } from "peerjs";

export default class PlaingAdapter {
  static createServer(id: string) {
    const server = new Peer(id);
  }
}
