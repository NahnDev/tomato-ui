import clsx from "clsx";
import React, { PropsWithChildren, useState } from "react";

enum Align {
  center = "center",
  left = "left",
  right = "right",
}

export default function BuilderBoardWrapper(props: Readonly<PropsWithChildren<{}>>) {
  const [align, setAlign] = useState(Align.left);

  const handleBackdropClick = (backdrop: Align) => {
    if (align === Align.center) return setAlign(backdrop);
    setAlign(Align.center);
  };
  return (
    <div className={clsx(["flex flex-row"])}>
      <Backdrop onDbClick={() => handleBackdropClick(Align.left)} shown={align !== Align.left} />
      <div className="h-full">{props.children}</div>
      <Backdrop onDbClick={() => handleBackdropClick(Align.right)} shown={align !== Align.right} />
    </div>
  );
}

function Backdrop(props: Readonly<{ onDbClick: () => any; shown: boolean }>) {
  return (
    <div
      className={clsx(["overflow-hidden duration-500", props.shown ? "w-full" : "w-0"])}
      onDoubleClick={props.onDbClick}
    ></div>
  );
}
