import React, { useState } from "react";
import CreateProjectPopup from "./CreateProjectPopup";
import { TProject, TShape, TShapeType, TStatus } from "./type";
import MakerBoard from "./MakerBoard";
import { useProject } from "./store/project";
import StatusBar from "./StatusBar";
import MakerSidebar from "./MakerSidebar";

type TMakerPopupProps = Readonly<{
  onClose: () => void;
}>;

export default function MakerWorkspace(props: TMakerPopupProps) {
  const [project] = useProject();
  return (
    <div className="grid grid-rows-[1fr_auto] size-full">
      <div className="grid grid-cols-[1fr_auto] size-full">
        <div className="grid grid-cols-[1fr_auto]">
          {project ? <MakerBoard></MakerBoard> : <CreateProjectPopup />}
          <MakerSidebar />
        </div>
      </div>
      <StatusBar></StatusBar>
    </div>
  );
}
