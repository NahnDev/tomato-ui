import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import { useInterval } from "usehooks-ts";

export default function useTimeCouter(seconds: number, start?: number) {
  const [timestamp, setTimestamp] = useState(0);
  const remaining = useMemo(
    () => (start ? start + seconds * 1000 - Date.now() : seconds * 1000),
    [start, seconds, timestamp]
  );
  useInterval(() => setTimestamp(Date.now()), start && remaining > 0 ? 1000 : null);
  return numeral(Math.round(Math.max(remaining, 0) / 1000)).format("00:00:00");
}
