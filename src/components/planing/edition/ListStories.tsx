import { TPlaning, TStory } from "@/types/plan";
import { useRef, useState } from "react";
import { IconButton, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCheck, faFileExcel, faXmark } from "@fortawesome/free-solid-svg-icons";
import ListSortable from "@/components/share/Sortable";
import {
  useStories,
  useStoryCreateHandler,
  useStoryDeleteHandler,
  useStorySortHandler,
  useStoryUpdateHandler,
} from "./stories";
import Action from "@/constants/action";
import { useForm } from "react-hook-form";
import { useCurrentStoryHandler } from "../store/story";
import AsyncButton from "@/components/share/button/AsyncButton";
import StateButton from "@/components/share/button/StateButton";
import { faJira } from "@fortawesome/free-brands-svg-icons";
import PlaningThumbnail from "./StoryThumbnail";
import AddFromCSV from "./AddFromExcel";
import { useBoolean } from "usehooks-ts";

export default function PlaningList(props: { planing: TPlaning }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<TStory>();

  const { focus } = useCurrentStoryHandler(props.planing._id);
  const stories = useStories(props.planing);
  const create = useStoryCreateHandler(props.planing._id, (story) => {
    setEditing(story);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  const modify = useStoryUpdateHandler(props.planing._id, () => {
    setEditing(undefined);
  });
  const remove = useStoryDeleteHandler(props.planing._id, () => {});
  const sort = useStorySortHandler(props.planing._id, () => {});

  const handleAction = (action: Action, story: TStory) => {
    switch (action) {
      case Action.REMOVE:
        return remove(story._id);
      case Action.FOCUS:
        return setEditing(story);
      case Action.PLAY:
        return focus(story._id);
    }
  };
  const { value: csvImporterShown, toggle: toggleCsvImpoterShown } = useBoolean(false);

  return (
    <div className="fluid grid grid-rows-[auto_1fr] gap-2 p-2">
      <div className="p-2 gap-2 flex flex-row">
        <AsyncButton label="Add story" icon={faAdd} size="sm" color="blue-gray" onClick={create} />
        <StateButton
          label="Import from CSV"
          icon={faFileExcel}
          size="sm"
          className="bg-[#188844]"
          onClick={toggleCsvImpoterShown}
        />
        <StateButton label="Import from Jira" icon={faJira} size="sm" color="blue" />
      </div>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
        <ListSortable items={stories.map(({ _id }) => _id)} setItems={(ids) => sort(ids as string[])}>
          {stories.map((story) => (
            <PlaningThumbnail
              key={story._id}
              story={story}
              isEditing={editing?._id === story._id}
              onAction={(action) => handleAction(action, story)}
              onSubmit={(payload) => modify(story._id, payload)}
              onBlur={() => setEditing(undefined)}
              onFocus={() => setEditing(story)}
            />
          ))}
        </ListSortable>
        <div ref={bottomRef}></div>
      </div>
      {csvImporterShown && <AddFromCSV onCancel={toggleCsvImpoterShown} />}
    </div>
  );
}
