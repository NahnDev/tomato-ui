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
      peerRef.current!.connect(props.member._id).on("open", function () {
        const call = peerRef.current!.call(props.member._id, streamRef.current);
        call.on("stream", function (stream) {});
      });
      peerRef.current!.on("call", (call) => {
        call.answer(streamRef.current);
        call.on("stream", (remoteStream) => {
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
