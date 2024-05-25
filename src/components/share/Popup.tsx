import React, {
  DragEventHandler,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DragLayerMonitor, XYCoord, useDrag, useDragLayer } from "react-dnd";
import clsx from "clsx";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { DndTypes } from "@/constants/dnd";
import { v4 as uuidv4 } from "uuid";

export type PopupProps = Readonly<
  PropsWithChildren<{
    name: string;
    onAbsolute?: () => any;
    onRelative?: () => any;
    onClose?: () => any;
  }>
>;

export function useDragPopupLayout(collect: (monitor: DragLayerMonitor<any>) => any, key: string) {
  const isAccept = (monitor: DragLayerMonitor<any>) => {
    return monitor.getItemType() === DndTypes.Popup && monitor.getItem().key === key;
  };
  return useDragLayer((monitor) => (isAccept(monitor) ? collect(monitor) : undefined));
}

export default function Popup(props: PopupProps) {
  const key = useRef<string>(uuidv4()).current;
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(new Date().getTime());
  const [absolute, setAbsolute] = useState(false);
  const [rect, setRect] = useState<XYCoord>();
  const [collected, dragRef] = useDrag({ type: DndTypes.Popup, item: { key } }, [key]);
  const [coord, setCoord] = useState<{ top: number; left: number }>();
  const dragCoord = useDragPopupLayout((monitor) => monitor.getClientOffset(), key);

  const isDragging = useMemo(() => dragCoord !== null, [dragCoord]);

  const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      toggle(true);
      setRect({ y: event.clientY - rect.top, x: event.clientX - rect.left });
    }
  };

  useLayoutEffect(() => {
    if (dragCoord && rect) {
      return setCoord({ top: dragCoord.y - rect.y, left: dragCoord.x - rect.x });
    }
    return undefined;
  }, [dragCoord, rect]);

  const toggle = (override?: boolean) => {
    setAbsolute(override ?? !absolute);
    setIndex(new Date().getTime());
    if (override ?? !absolute) {
      props.onAbsolute && props.onAbsolute();
    } else {
      props.onRelative && props.onRelative();
    }
  };

  if (!props.children) return <></>;
  return (
    <div
      ref={containerRef}
      className={clsx(absolute && "fixed z-50", "bg-white border-2 border-gray-200 rounded-md")}
      style={{ ...coord }}
    >
      <div>
        <div className="flex flex-row items-center p-2 gap-2">
          <div className="relative flex-1">
            <span className="select-none font-semibold text-red-500 px-2">{props.name}</span>
            <div
              className={clsx("cursor-pointer overlay", isDragging && "opacity-0")}
              onDragStart={handleDragStart}
              ref={dragRef}
              {...(collected as any)}
            />
          </div>
          <IconButton variant="text" className="!size-4 text-black" onClick={() => toggle()}>
            <FontAwesomeIcon icon={absolute ? faCompress : faExpand} />
          </IconButton>
          <IconButton variant="text" className="!size-4 text-black" onClick={props.onClose}>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </IconButton>
        </div>
        <div className="max-h-[80vh] overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
}
