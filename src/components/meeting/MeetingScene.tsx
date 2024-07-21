import { useEffect, useRef } from "react";
import Scene from "./Scene";
import { Peer } from "peerjs";
import { TMember } from "../members/type";

export default function MeetingScene(props: { member: TMember }) {
  const ref = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer>();
  const streamRef = useRef<MediaStream>(new MediaStream());

  useEffect(() => {
    peerRef.current = new Peer();
    peerRef.current.on("open", (id) => {
      console.log("peer open", id);
      peerRef.current!.connect(props.member._id).on("open", function () {
        console.log("connected");
        const call = peerRef.current!.call(props.member._id, streamRef.current);
        call.on("stream", function (stream) {
          console.log("// `stream` is the MediaStream of the remote peer.");
          console.log(stream);
        });
      });
      peerRef.current!.on("call", (call) => {
        console.log("call received ------------------- 2");
        call.answer(streamRef.current);
        call.on("stream", (remoteStream) => {
          console.log("Received remote stream");
          if (ref.current) {
            ref.current.srcObject = remoteStream;
          }
        });
      });
    });

    return () => {
      peerRef.current?.destroy();
    };
  }, []);

  return (
    <Scene member={props.member!}>
      <video ref={ref} className="mx-auto h-full" autoPlay />
    </Scene>
  );
}
