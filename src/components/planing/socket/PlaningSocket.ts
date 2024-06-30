import PlaningEvents from "@/events/PlaningEvent";
import { TPlaning } from "@/types/plan";
import Cookies, { set } from "js-cookie";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import { currentStory } from "../store/story";
import { currentPlaningState } from "../store/planing";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

export default function PlaningSocket(props: PropsWithChildren<{ planing: TPlaning }>) {
  const socket = useRef<Socket>();
  const setCurrentStory = useSetRecoilState(currentStory(props.planing._id));
  const setPlaning = useSetRecoilState(currentPlaningState(props.planing._id));

  useEffect(() => {
    socket.current = io(`${WS_URL}/planing`, {
      secure: true,
      auth: { token: Cookies.get("token") },
      query: { planing: props.planing._id },
    });
    socket.current.on("connect", () => {
      console.log("connected");
      socket.current?.on(PlaningEvents.VOTING_CHANGED, (story) => {
        console.log("current story changed", story);
        setCurrentStory(story);
      });
      socket.current?.on(PlaningEvents.PLANING_CHANGED, (planing) => {
        setPlaning(planing);
      });
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return props.children;
}
