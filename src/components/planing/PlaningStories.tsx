import { faGripVertical, faList, faPlay, faPlus, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, IconButton, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import clsx from "clsx";
import { Component, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useCurrentStory, useStories } from "./store/stories";
import { TStory } from "./store/type";

enum TTabs {
  Stories = "stories",
  Finished = "finished",
}
const TABS = [
  { label: "Stories", value: TTabs.Stories, Component: PlaningList },
  { label: "Finished", value: TTabs.Finished, Component: PlaningFinished },
];

export default function PlaningStories() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.Stories);
  const [stories] = useStories();
  const finished = useMemo(() => stories.filter((s) => s.finished), [stories]);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <>
      <div className="fixed right-0 top-40 z-40">
        <div className="pr-2 bg-red-500 rounded-tl-full rounded-bl-full">
          <IconButton className="rounded-full bg-red-500" onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
          </IconButton>
        </div>
      </div>

      <div
        ref={ref}
        className={clsx([
          "fixed z-50 h-full w-[50em] bg-white shadow-lg duration-1000",
          open ? " right-0" : "-right-full",
        ])}
      >
        <div className="p-2">
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className: "bg-transparent border-b-2 border-red-500 shadow-none rounded-none",
              }}
            >
              <Tab
                value={TTabs.Stories}
                onClick={() => setActiveTab(TTabs.Stories)}
                className={clsx([activeTab === TTabs.Stories && "text-gray-900", "p-2"])}
              >
                <div className="flex flex-row items-center gap-2 ">
                  <span className="font-semibold">Stories </span>
                  <div className="text-xs font-bold text-white bg-red-500 rounded-full size-6 flex items-center justify-center">
                    {stories.length - finished.length}
                  </div>
                </div>
              </Tab>
              <Tab
                value={TTabs.Finished}
                onClick={() => setActiveTab(TTabs.Finished)}
                className={clsx([activeTab === TTabs.Finished && "text-gray-900", "p-2"])}
              >
                <div className="flex flex-row items-center gap-2 ">
                  <span className="font-semibold">Finished </span>
                  <div className="text-xs font-bold text-white bg-slate-500 rounded-full size-6 flex items-center justify-center">
                    {finished.length}
                  </div>
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value={TTabs.Stories}>
                <PlaningList />
              </TabPanel>
              <TabPanel value={TTabs.Finished}>
                <PlaningFinished />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function PlaningList() {
  const [currentStory, setCurrentStory] = useCurrentStory();
  const [stories, createOrUpdate, remove] = useStories();
  const [item, setItem] = useState<Partial<TStory>>();
  const isCreation = useMemo(() => !item?.id, [item]);

  const handleCreateOrUpdate = () => {
    if (!item) return;
    createOrUpdate(item);
    setItem(undefined);
  };

  const handleModify = (story: TStory) => {
    setItem(story);
  };

  const handleDelele = (story: TStory) => {
    if (item?.id === story.id) setItem(undefined);
    remove(story.id);
  };

  const handlePlay = (story: TStory) => {
    setCurrentStory(story);
  };

  return (
    <div className="p-2">
      <div className="flex flex-row p-2 gap-2 items-center">
        <Input
          label="Story title"
          value={item?.title ?? ""}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
          onKeyDown={(e) => e.key === "Escape" && setItem(undefined)}
        ></Input>
        <Button
          disabled={!item?.title}
          color="red"
          variant="text"
          className="flex flex-row gap-2 items-center w-40"
          onClick={handleCreateOrUpdate}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-nowrap">{isCreation ? "Add story" : "Save story"}</span>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {stories.map((story) => (
          <PlaningThumbnail
            key={story.id}
            story={story}
            playing={currentStory?.id === story.id}
            selected={item?.id === story.id}
            onMofified={() => handleModify(story)}
            onDeleted={() => handleDelele(story)}
            onPlay={() => handlePlay(story)}
          />
        ))}
      </div>
    </div>
  );
}

type TPlaningThumbnailProps = Readonly<{
  story: TStory;
  playing: boolean;
  selected: boolean;
  onMofified: () => void;
  onDeleted: () => void;
  onPlay: () => void;
}>;

function PlaningThumbnail(props: TPlaningThumbnailProps) {
  return (
    <div className={clsx(["p-2 flex flex-row gap-2 items-center"])}>
      <FontAwesomeIcon
        className={clsx(["px-2 text-slate-500", props.selected && "text-red-500"])}
        icon={faGripVertical}
      />
      <h6 className="text-nowrap overflow-hidden text-ellipsis cursor-pointer flex-1" onClick={props.onMofified}>
        {props.story.title}
      </h6>
      <div className="flex flex-row items-center">
        <IconButton variant="text" className="rounded-full text-red-500" onClick={props.onDeleted}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
        <div className="w-6">
          {props.playing ? (
            <div className="relative p-2">
              <FontAwesomeIcon className="animate-spin text-blue-500" icon={faSpinner} />
            </div>
          ) : (
            <IconButton variant="text" className="rounded-full text-slate-700" onClick={props.onPlay}>
              <FontAwesomeIcon icon={faPlay} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}

function PlaningFinished() {
  return (
    <div>
      <header className="grid grid-cols-4 text-red-500 font-semibold ">
        <span className="col-span-3">Title</span>
        <span className="text-center">Est.</span>
      </header>
      <main>
        <div className="grid grid-cols-4">
          <span className="text-nowrap text-ellipsis overflow-hidden col-span-3">
            Atom effects are an API for managing side-effects and synchronizing or initializing Recoil atoms.
          </span>
          <span className="text-center font-bold">2</span>
        </div>
      </main>
    </div>
  );
}
