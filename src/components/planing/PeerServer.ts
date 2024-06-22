import { v4 as uuidV4 } from "uuid";
import { roomAtom } from "./store/room";
import { Peer } from "peerjs";

export default class PeerServer {
  static server: Peer;
  static createServer(id: string) {
    this.server = new Peer();
    this.server.on("open", (id) => {});
  }
}
