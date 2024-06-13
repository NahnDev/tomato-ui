import React, { PropsWithChildren, useMemo } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, IconButton } from "@material-tailwind/react";
import { TShapeType } from "../type";
import Image from "next/image";
import { useProject } from "../store/project";
import { v4 as uuidV4 } from "uuid";
import Konva from "konva";

export const SHAPES = {
  [TShapeType.Circle]: {
    svg: "/svg/circle.svg",
    Class: Konva.Circle,
  },
  [TShapeType.Rect]: {
    svg: "/svg/rect.svg",
    Class: Konva.Rect,
  },
};

export default function ShapeMenu() {
  const [project, setProject] = useProject();
  const keys = useMemo(() => Object.keys(SHAPES) as (keyof typeof SHAPES)[], []);

  const addShape = (key: TShapeType) => {
    setProject({
      ...project,
      shapes: [
        ...project.shapes,
        {
          type: key,
          x: 0,
          y: 0,
          width: project.width * 0.5,
          height: project.width * 0.5,
          fill: "#00AAAA",
          id: uuidV4(),
        },
      ],
    });
  };
  return (
    <div>
      <div className="grid grid-cols-2 p-2 gap-2">
        {keys.map((key) => (
          <ShapeThumbnail key={key} onClick={() => addShape(key)} svg={SHAPES[key].svg}></ShapeThumbnail>
        ))}
      </div>
    </div>
  );
}

type TShapeThumbnailProps = Readonly<
  PropsWithChildren<{
    svg: string;
    onClick: () => void;
  }>
>;
function ShapeThumbnail(props: TShapeThumbnailProps) {
  return (
    <Button variant="text" onClick={props.onClick} className="flex justify-center items-center">
      <div className="w-20 h-20">
        <Image src={props.svg} alt="" width={100} height={100}></Image>
      </div>
    </Button>
  );
}
