import { StoryStatus, TPlaning, TStory } from "@/types/plan";
import { use, useMemo, useRef, useState } from "react";
import { Button, Dialog, IconButton, Input, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faForward,
  faGripVertical,
  faHand,
  faHourglass,
  faPlay,
  faPlus,
  faRotateBackward,
  faSpinner,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Sortable from "@/components/share/Sortable";
import {
  storiesState,
  useStories,
  useStoryCreateHandler,
  useStoryDeleteHandler,
  useStoryStortHandler,
  useStoryUpdateHandler,
} from "./stories";
import Action from "@/constants/action";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { set } from "js-cookie";
import { useResetRecoilState } from "recoil";
import { useCurrentStoryHandler } from "../store/story";

export default function PlaningList(props: { planing: TPlaning }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<TStory>();

  const { focus } = useCurrentStoryHandler(props.planing._id);
  const reset = useResetRecoilState(storiesState(props.planing._id));
  const stories = useStories(props.planing);
  const create = useStoryCreateHandler(props.planing, () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  const modify = useStoryUpdateHandler(props.planing, () => {
    setSelected(undefined);
  });
  const remove = useStoryDeleteHandler(props.planing, () => {});
  const sort = useStoryStortHandler(props.planing, () => {});

  const handleAction = (action: Action, story: TStory) => {
    switch (action) {
      case Action.REMOVE:
        remove(story._id);
        break;
      case Action.TOGGLE:
        setSelected(story);
        break;
      case Action.PLAY:
        focus(story._id);
        reset();
        break;
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
    props.onAction(action);
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
          {isWaiting && isCurrent && <FontAwesomeIcon className="animate-spin text-blue-500" icon={faSpinner} />}
          {isWaiting && !isCurrent && <FontAwesomeIcon icon={faPlay} onClick={action(Action.PLAY)} />}
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
