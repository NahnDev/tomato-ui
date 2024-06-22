import { PropsWithChildren, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export type TPlaningAdaptorProps = PropsWithChildren<{}>;

export default function PlaningAdaptor(props: TPlaningAdaptorProps) {
  const socketRef = useRef<Socket>();
  useEffect(() => {
    if (socketRef.current) return;
    socketRef.current = io("ws://127.0.0.1:8000");
    socketRef.current.on("connect", () => {});
  });

  return <>{props.children}</>;
}
