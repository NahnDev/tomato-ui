import Action from "@/constants/action";
import { TStory, StoryStatus } from "@/types/plan";
import { useSortable } from "@dnd-kit/sortable";
import {
  faCheck,
  faForward,
  faGripVertical,
  faHand,
  faPlay,
  faRotateBackward,
  faSpinner,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useMemo, useEffect, KeyboardEventHandler, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { IconButton, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

type TPlaningThumbnailProps = Readonly<{
  story: TStory;
  isEditing: boolean;
  onAction: (action: Action) => void;
  onSubmit: (payload: Pick<TStory, "title">) => void;
  onBlur: () => void;
  onFocus: () => void;
}>;

export default function PlaningThumbnail(props: TPlaningThumbnailProps) {
  const { listeners, setNodeRef, setActivatorNodeRef, transform, attributes, transition } = useSortable({
    id: props.story._id,
  });
  const isCurrent = useMemo(() => props.story.isCurrent, [props.story.isCurrent]);
  const isWaiting = useMemo(() => props.story.status === StoryStatus.WAITING, [props.story.status]);
  const isFinished = useMemo(() => props.story.status === StoryStatus.FINISHED, [props.story.status]);
  const isVoting = useMemo(() => props.story.status === StoryStatus.VOTING, [props.story.status]);
  const isSkipped = useMemo(() => props.story.status === StoryStatus.SKIPPED, [props.story.status]);
  const isDisabled = useMemo(() => isFinished || isVoting, [isFinished, isVoting]);

  const action = (action: Action) => () => {
    if (isFinished) return;
    return props.onAction(action);
  };

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={clsx(["p-2 gap-2 w-full  group", "flex flex-row  items-center justify-center h-12"])}
    >
      <div ref={setActivatorNodeRef} {...listeners}>
        <FontAwesomeIcon className={clsx(["px-2"])} icon={faGripVertical} />
      </div>
      <div className={clsx(["flex-1 flex flex-row gap-2 items-center justify-center"])}>
        {props.isEditing ? (
          <PlaningUpdateForm item={props.story} onCancel={props.onBlur} onSubmit={props.onSubmit} />
        ) : (
          <div className="flex-1 grid grid-cols-[1fr_auto] items-center justify-center ">
            <h6
              className={clsx([
                "text-nowrap overflow-hidden text-ellipsis cursor-pointer flex-1 text-sm",
                isFinished && "line-through",
              ])}
              onDoubleClick={props.onFocus}
            >
              {props.story.title}
            </h6>
            <div className="flex flex-row items-center">
              {!isFinished && (
                <IconButton variant="text" className="rounded-full text-red-500" onClick={action(Action.REMOVE)}>
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              )}
              <div className="relative p-2 w-10">
                {isWaiting && !isCurrent && (
                  <FontAwesomeIcon
                    icon={faPlay}
                    onClick={action(Action.PLAY)}
                    className="hover:animate-pulse active:opacity-50 rounded-full"
                  />
                )}
                {isWaiting && isCurrent && <FontAwesomeIcon className="animate-spin text-blue-500" icon={faSpinner} />}
                {isSkipped && isCurrent && <FontAwesomeIcon className="animate-spin text-blue-500" icon={faSpinner} />}
                {isSkipped && !isCurrent && <FontAwesomeIcon icon={faRotateBackward} onClick={action(Action.PLAY)} />}
                {isVoting && <FontAwesomeIcon className="text-green-500 animate-pulse" icon={faHand} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlaningUpdateForm(props: {
  item: TStory;
  onSubmit: (payload: Pick<TStory, "title">) => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(props.item.title);

  const onSubmit = () => {
    props.onSubmit({ title });
  };

  const onKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      props.onCancel();
    }
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-row  gap-2 items-center">
      <div className="flex-1">
        <Input
          ref={ref}
          autoFocus
          className="pt-2"
          variant="standard"
          onKeyDown={onKeydown}
          onFocus={(e) => e.target.select()}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </div>
      <div className="flex flex-row  justify-center items-end gap-2">
        <IconButton disabled={!title} type="submit" color="red" variant="text" onClick={onSubmit}>
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
        <IconButton color="gray" variant="text" onClick={props.onCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </div>
    </div>
  );
}
