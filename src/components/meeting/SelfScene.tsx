import { useEffect, useRef, useState } from "react";
import Scene from "./Scene";
import { useStream } from "./MeetingProvider";
import { useAuth } from "@/state/auth/hook";

export default function SelfScene() {
  const ref = useRef<HTMLVideoElement>(null);
  const [stream] = useStream();
  const { user } = useAuth();

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Scene stream={stream} member={user!}>
      <video ref={ref} autoPlay className="mx-auto w-full" />
    </Scene>
  );
}
