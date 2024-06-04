import { Button } from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import { ControlProps } from "../types";
import Container from "../../Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useInterval } from "usehooks-ts";

export default function ButtonSubmit(props: ControlProps) {
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(false);
  const isComplete = useMemo(() => percent >= 100, [percent]);

  useInterval(() => {
    setPercent(percent + 10);
  }, 150);

  useEffect(() => {
    if (!active && percent < 100) setPercent(0);
  }, [active, percent]);

  return (
    <Button
      className="w-full h-full p-0 bg-gray-500 relative overflow-hidden z-0"
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className="absolute w-full h-full top-0 -z-10 duration-300"
        style={{ left: `-${100 - percent}%`, background: props.control.config.background ?? "#00ff00" }}
      ></div>
      <div className="px-5 flex flex-row justify-between z-10">
        {props.control.config.label} <FontAwesomeIcon icon={isComplete ? faCheckCircle : faXmarkCircle} />
      </div>
    </Button>
  );
}
