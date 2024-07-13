import PlanningEvents from "@/events/PlanningEvent";
import { TPlanning } from "@/types/plan";
import Cookies, { set } from "js-cookie";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import { currentStory } from "../store/story";
import { currentPlanningState } from "../store/planning";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

export default function PlanningSocket(props: PropsWithChildren<{ planning: TPlanning }>) {
  const socket = useRef<Socket>();
  const setCurrentStory = useSetRecoilState(currentStory(props.planning._id));
  const setPlanning = useSetRecoilState(currentPlanningState(props.planning._id));

  useEffect(() => {
    socket.current = io(`${WS_URL}/planning`, {
      secure: true,
      auth: { token: Cookies.get("token") },
      query: { planning: props.planning._id },
    });
    socket.current.on("connect", () => {
      console.log("connected");
      socket.current?.on(PlanningEvents.VOTING_CHANGED, (story) => {
        console.log("current story changed", story);
        setCurrentStory(story);
      });
      socket.current?.on(PlanningEvents.PLANNING_CHANGED, (planning) => {
        setPlanning(planning);
      });
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return props.children;
}
