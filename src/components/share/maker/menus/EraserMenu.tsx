import React, { useEffect } from "react";
import { useMode } from "../store/mode";
import { TMode } from "../type";

export default function EraserMenu(props: { onClose: () => void }) {
  const [mode, setMode] = useMode();
  useEffect(() => {
    setMode(TMode.Eraser);
    props.onClose();
  }, []);

  return <></>;
}
