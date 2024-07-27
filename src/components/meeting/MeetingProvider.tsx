"use client";

import PlanningEvents from "@/events/PlanningEvent";
import { useAuth } from "@/state/auth/hook";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { Peer } from "peerjs";
import { createContext, PropsWithChildren, use, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";
import { Stream } from "stream";
import { meetingState } from "./state/state";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
enum MeetingEvents {
  USER_ADDED = "meeting/user-added",
  USER_REMOVED = "meeting/user-removed",
}

export type MeetingContextType = {
  stream: MediaStream;
  setStream: (stream: MediaStream) => void;
};

export const MeetingContext = createContext<MeetingContextType>({} as MeetingContextType);

export default function MeetingProvider(props: PropsWithChildren) {
  const { id } = useParams();
  const socket = useRef<Socket>();
  const peerRef = useRef<Peer>();
  const { user } = useAuth();
  const [meeting, setMeeting] = useRecoilState(meetingState(id as string));
  const [stream, setStream] = useState<MediaStream>(new MediaStream());

  useEffect(() => {
    socket.current = io(`${WS_URL}/meetings`, {
      secure: true,
      auth: { token: Cookies.get("token") },
      query: { id },
    });
    socket.current.on("connect", () => {
      socket.current?.on(MeetingEvents.USER_ADDED, (user) => {
        setMeeting((prev) => ({ ...prev, users: [...prev.users.filter((u) => u._id !== user._id), user] }));
      });
      socket.current?.on(MeetingEvents.USER_REMOVED, (user) => {
        setMeeting((prev) => ({ ...prev, users: prev.users.filter((u) => u._id !== user._id) }));
      });
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user._id === "6693a1f9d19ee2a708b26836") {
      return;
    }
    peerRef.current = new Peer(user._id);
    peerRef.current.on("open", (id) => {
      peerRef.current?.on("call", (call) => {
        call.answer(stream);
        // call.answer(stream);

        call.on("stream", (remoteStream) => {
          // Handle the remote stream here
        });

        call.on("error", (error) => {
          console.error("Call error:", error);
        });
      });
    });

    return () => {
      peerRef.current?.destroy();
    };
  }, [user]);

  return <MeetingContext.Provider value={{ stream, setStream }}>{props.children}</MeetingContext.Provider>;
}

export function useStream() {
  const { stream, setStream } = useContext(MeetingContext);
  return [stream, setStream] as const;
}

export function useAudioStreamActions() {
  const [isListening, setIsListening] = useState(false);
  const [stream, setStream] = useStream();

  const checkListening = () => {
    setIsListening(stream.getAudioTracks().length > 0);
  };

  const mute = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.stop();
      stream.removeTrack(track);
    });
    checkListening();
  };

  const unmute = () => {
    if (!stream) return;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((audioStream) => {
        audioStream.getAudioTracks().forEach((track) => stream.addTrack(track));
        checkListening();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return [isListening, { mute, unmute }] as const;
}

export function useCameraStreamActions() {
  const [isCameraLiving, setIsCameraLiving] = useState(false);
  const [stream, setStream] = useStream();

  const checkCamera = () => {
    setIsCameraLiving(stream.getVideoTracks().length > 0);
  };

  const stop = () => {
    stream.getVideoTracks().forEach((track) => {
      track.stop();
      stream.removeTrack(track);
    });
    checkCamera();
  };

  const start = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((videoStream) => {
        setStream(videoStream);
        // videoStream.getVideoTracks().forEach((track) => stream.addTrack(track));
        checkCamera();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return [isCameraLiving, { start, stop }] as const;
}
