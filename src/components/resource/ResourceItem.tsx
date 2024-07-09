import clsx from "clsx";
import ResourceIcon from "./ResourceIcon";
import { useIsEditing, useIsSelected, useResouceMoveHandler, useResources, useResourceUpdateHandler } from "./state";
import { ROOT_DIRECTORY, TResourceItem } from "./type";
import { KeyboardEventHandler, MouseEventHandler, useEffect, useMemo, useState } from "react";
import { useBoolean, useDebounceCallback } from "usehooks-ts";
import IconButton from "../share/button/IconButton";
import { faCaretLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOverCallback, useResourceDrag, useResourceDrop } from "./hooks";
import { useResourcesFiflter } from "./ResourceProvider";

export type TResourceItemProps = {
  item: TResourceItem;
};

export default function ResourceItem(props: TResourceItemProps) {
  const [{ isDragging }, dragRef] = useResourceDrag(props.item);

  const [isSelected, toggleSelected] = useIsSelected(props.item);
  const [isEditing, toggleEditing] = useIsEditing(props.item);
  const isDirectory = useMemo(() => props.item.isDirectory, [props.item]);
  const { value: expand, toggle, setTrue: setExpand } = useBoolean(false);
  const [isLoading, setIsLoading] = useState(false);

  const move = useResouceMoveHandler();
  const update = useResourceUpdateHandler(() => {});

  const handleChangeName = async (title: string) => {
    setIsLoading(true);
    await update({ title });
    setIsLoading(false);
  };

  const handleSelected = () => {
    toggleSelected();
    if (!expand) toggle();
  };

  const handleExpand: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    toggle();
  };

  const handleMove = async (item: TResourceItem) => {
    setIsLoading(true);
    await move(item, props.item);
    setIsLoading(false);
  };

  const [{ isOver }, dropRef] = useResourceDrop(props.item, handleMove);
  useOverCallback(setExpand, isOver);
  return (
    <div className="flex flex-col pl-2 w-full gap-[1px] relative">
      <div className="w-4  border-b-[1px] border-slate-200  absolute top-6 left-0"></div>
      <div
        ref={(ref) => dragRef(dropRef(ref))}
        onDragStart={handleSelected}
        className={clsx(["flex flex-row gap-2 items-center font-normal group", isDragging && "opacity-0"])}
      >
        <div
          className={clsx([
            "p-2 flex-1 flex flex-row items-center",
            "group-hover:bg-slate-200 duration-500",
            "rounded-lg cursor-pointer",
            isSelected && "bg-gray-200",
          ])}
          onClick={handleSelected}
          onDoubleClick={toggleEditing}
        >
          <ResourceIcon className="px-2 text-xs" item={props.item} open={expand} isLoading={isLoading} />
          <ResourceName
            title={props.item.title}
            editing={isEditing}
            onChange={handleChangeName}
            onCancel={toggleEditing}
          />
          {props.item.isDirectory && (
            <IconButton icon={faCaretLeft} className={clsx([expand && "-rotate-90"])} onClick={handleExpand} />
          )}
        </div>
      </div>
      {expand && isDirectory && <ResourceChildren directory={props.item._id} />}
    </div>
  );
}

export function ResourceChildren(props: { directory: TResourceItem["directory"] }) {
  const [children, isLoading] = useResources(props.directory ?? ROOT_DIRECTORY);
  const resources = useResourcesFiflter(children);
  return (
    <div className="pl-5">
      <div className="flex flex-col border-l-[1px] border-slate-200 gap-[1px]">
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin p-2" />
        ) : (
          resources.map((item) => <ResourceItem key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}

export type TResourceNameProps = {
  title: string;
  editing: boolean;
  onChange: (title: string) => void;
  onCancel: () => void;
};
export function ResourceName(props: TResourceNameProps) {
  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case "Enter":
        props.onChange(e.currentTarget.value);
        break;
      case "Escape":
        props.onCancel();
        break;
    }
  };

  if (props.editing)
    return (
      <input
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeydown}
        className="flex-1 p-1 bg-transparent focus:outline-none"
        defaultValue={props.title}
        ref={(ref) => ref?.select()}
        autoFocus
      ></input>
    );
  return <span className="flex-1 p-1 select-none">{props.title}</span>;
}
