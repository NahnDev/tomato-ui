import React from "react";
import { IconDefinition, faArrowsDownToLine, faArrowsUpToLine, faUpDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../button/IconButton";
import { Button } from "@material-tailwind/react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useBackwardShapes, useForwardShapes } from "../store/project";
import { useBoardSelectedState } from "../store/board";

export default function ShapeSetting() {
  const [selected] = useBoardSelectedState();
  const handleForward = useForwardShapes();
  const handleBackward = useBackwardShapes();

  return (
    <div>
      <div className="grid grid-cols-2 p-2 gap-2">
        <OptionButton icon={faArrowsUpToLine} label="Forward" onClick={() => handleForward(selected)}></OptionButton>
        <OptionButton
          icon={faArrowsDownToLine}
          label="Backward"
          onClick={() => handleBackward(selected)}
        ></OptionButton>
      </div>
    </div>
  );
}

function OptionButton(props: { icon: IconProp; label: string; onClick?: () => void }) {
  return (
    <Button variant="text" className="text-sm flex flex-row justify-center items-center gap-2" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
      <span className="capitalize">{props.label}</span>
    </Button>
  );
}
