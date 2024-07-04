import { StoryStatus, TPlaning, TStory } from "@/types/plan";
import { useMemo, useRef, useState } from "react";
import { IconButton, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faForward,
  faGripVertical,
  faHand,
  faPlay,
  faPlus,
  faRotateBackward,
  faSpinner,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Sortable from "@/components/share/Sortable";
import {
  useStories,
  useStoryCreateHandler,
  useStoryDeleteHandler,
  useStoryStortHandler,
  useStoryUpdateHandler,
} from "./stories";
import Action from "@/constants/action";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useCurrentStoryHandler } from "../store/story";

export default function PlaningList(props: { planing: TPlaning }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<TStory>();

  const { focus } = useCurrentStoryHandler(props.planing._id);
  const stories = useStories(props.planing);
  const create = useStoryCreateHandler(props.planing._id, () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  const modify = useStoryUpdateHandler(props.planing._id, () => {
    setSelected(undefined);
  });
  const remove = useStoryDeleteHandler(props.planing._id, () => {});
  const sort = useStoryStortHandler(props.planing._id, () => {});

  const handleAction = (action: Action, story: TStory) => {
    switch (action) {
      case Action.REMOVE:
        return remove(story._id);
      case Action.TOGGLE:
        return setSelected(story);
      case Action.PLAY:
        return focus(story._id);
    }
  };

  return (
    <div className="fluid grid grid-rows-[auto_1fr] gap-2 p-2">
      <div className="p-2">
        {selected ? (
          <PlaningUpdateForm
            item={selected}
            onSubmit={(payload) => modify(selected._id, payload)}
            onCancel={() => setSelected(undefined)}
          ></PlaningUpdateForm>
        ) : (
          <PlaningCreateForm onSubmit={create}></PlaningCreateForm>
        )}
      </div>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
        <Sortable
          render={(id) => {
            const story = stories.find((s) => s._id === id)!;
            return (
              <PlaningThumbnail
                key={story._id}
                story={story}
                selected={selected?._id === story._id}
                onAction={(action) => handleAction(action, story)}
              />
            );
          }}
          items={stories.map(({ _id }) => _id)}
          setItems={(ids) => sort(ids as string[])}
        ></Sortable>
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}

type TPlaningThumbnailProps = Readonly<{
  story: TStory;
  selected: boolean;
  onAction: (action: Action) => void;
}>;

function PlaningThumbnail(props: TPlaningThumbnailProps) {
  const isCurrent = useMemo(() => props.story.isCurrent, [props.story.isCurrent]);
  const isWaiting = useMemo(() => props.story.status === StoryStatus.WAITING, [props.story.status]);
  const isFinished = useMemo(() => props.story.status === StoryStatus.FINISHED, [props.story.status]);
  const isVoting = useMemo(() => props.story.status === StoryStatus.VOTING, [props.story.status]);
  const isSkipped = useMemo(() => props.story.status === StoryStatus.SKIPPED, [props.story.status]);

  const action = (action: Action) => () => {
    if (isFinished) return;
    return props.onAction(action);
  };

  return (
    <div className={clsx(["p-2 w-full flex flex-row gap-2 items-center ", props.selected && "animate-pulse"])}>
      <FontAwesomeIcon
        className={clsx(["px-2", props.selected && "text-slate-500", props.story.isCurrent && "text-red-500"])}
        icon={isSkipped ? faForward : faGripVertical}
      />
      <h6
        className={clsx([
          "text-nowrap overflow-hidden text-ellipsis cursor-pointer flex-1",
          isFinished && "line-through",
        ])}
        onClick={action(Action.TOGGLE)}
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
          {isFinished && <FontAwesomeIcon className="text-red-500" icon={faCheck} />}
        </div>
      </div>
    </div>
  );
}

function PlaningCreateForm(props: { onSubmit: (payload: Pick<TStory, "title">) => void }) {
  const { register, handleSubmit, reset, formState } = useForm();

  const onSubmit = (payload: any) => {
    props.onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row p-2 gap-2 ">
      <div className="flex-1">
        <Input
          variant="standard"
          containerProps={{ className: "w-full" }}
          label="Story title"
          {...register("title", { required: true })}
        ></Input>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <IconButton disabled={!formState.isValid} type="submit" color="red" variant="text">
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </div>
    </form>
  );
}

function PlaningUpdateForm(props: {
  item: TStory;
  onSubmit: (payload: Pick<TStory, "title">) => void;
  onCancel: () => void;
}) {
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues: { title: props.item.title } });

  const onSubmit = (payload: any) => {
    props.onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row p-2 gap-2 items-center">
      <div className="flex-1">
        <Input variant="standard" label="Story title" {...register("title", { required: true })}></Input>
      </div>
      <div className="flex flex-row  justify-center items-end gap-2">
        <IconButton disabled={!formState.isValid} type="submit" color="red" variant="text">
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
        <IconButton color="gray" variant="text" onClick={props.onCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </div>
    </form>
  );
}
