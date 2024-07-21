"use client";

import clsx from "clsx";
import IconButton from "../share/button/IconButton";
import {
  faCamera,
  faDisplay,
  faEllipsis,
  faMicrophone,
  faMicrophoneAlt,
  faMicrophoneSlash,
  faPhoneSlash,
  faVideo,
  faVideoCamera,
  faVideoSlash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAudioStreamActions, useCameraStreamActions, useStream } from "./MeetingProvider";

export default function MeetingControl() {
  const [isListening, { mute, unmute }] = useAudioStreamActions();
  const [isCameraLiving, { stop, start }] = useCameraStreamActions();

  return (
    <div className="flex flex-row gap-2 p-2">
      <ActionButton icon={isListening ? faMicrophoneSlash : faMicrophone} onClick={isListening ? mute : unmute} />
      <ActionButton icon={isCameraLiving ? faVideoSlash : faVideo} onClick={isCameraLiving ? stop : start} />
      <ActionButton icon={faDisplay} />
      <ActionButton icon={faEllipsis} />
      <Button className="flex flex-row gap-2 bg-red-500">
        <FontAwesomeIcon icon={faPhoneSlash} />
        <span>Leave</span>
      </Button>
    </div>
  );
}

export function ActionButton(props: { icon: IconDefinition; className?: string; onClick?: () => void }) {
  return (
    <Button
      className={clsx([
        "size-10 rounded-full p-0 flex flex-col items-center justify-center",
        "bg-slate-700 text-white hover:text-slate-700 duration-500",
        props.className,
      ])}
      variant="text"
      onClick={props.onClick}
    >
      <FontAwesomeIcon className="text-lg" icon={props.icon} />
    </Button>
  );
}
