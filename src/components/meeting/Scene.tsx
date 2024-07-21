import { TUser } from "@/types/TUser";
import { faEllipsisH, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { PropsWithChildren, useEffect, useState } from "react";

export type TSceneProps = PropsWithChildren<{
  stream?: MediaStream;
  member: TUser;
}>;

export default function Scene(props: TSceneProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (props.stream && props.stream.getAudioTracks().length > 0) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(props.stream);
      source.connect(analyser);
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkSpeaking = () => {
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const average = sum / dataArray.length;
        setIsSpeaking(average > 20);
      };

      const interval = setInterval(checkSpeaking, 100);

      return () => {
        clearInterval(interval);
        audioContext.close();
      };
    }
  }, [props.stream]);

  return (
    <div
      className={clsx([
        "relative group",
        " flex items-center justify-center",
        "size-full w-72 h-48 rounded-lg overflow-hidden bg-slate-700",
        "border-4 duration-200",
        isSpeaking ? "border-green-500" : "border-transparent",
      ])}
    >
      {props.children}
      <div
        className={clsx([
          "absolute invisible group-hover:visible",
          "top-1 left-1  bg-slate-700 bg-opacity-25 rounded-sm",
          "text-white text-xs p-1 px-2",
          "flex flex-row gap-2 items-center",
        ])}
      >
        <FontAwesomeIcon icon={faEllipsisH} className="cursor-pointer" />
        <span>{props.member.name}</span>
      </div>
    </div>
  );
}
