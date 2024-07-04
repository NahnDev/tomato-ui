import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import { useInterval } from "usehooks-ts";
import useAudio from "react-use/lib/useAudio";
import usePermission from "react-use/lib/usePermission";

export default function useTimeCountdown(active: boolean, start: number, seconds: number) {
  const [timestamp, setTimestamp] = useState(0);
  const remaining = start ? start + seconds * 1000 - Date.now() : seconds * 1000;
  const isPlaying = useMemo(() => remaining > 0 && active, [remaining, active]);

  useInterval(() => setTimestamp(Date.now()), isPlaying ? 1000 : null);
  return [numeral(Math.round(Math.max(remaining, 0) / 1000)).format("00:00:00"), isPlaying, remaining] as const;
}
