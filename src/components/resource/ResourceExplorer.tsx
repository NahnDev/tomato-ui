import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROOT_DIRECTORY, TResourceItem, items } from "./seed";
import {
  faCaretRight,
  faCheckCircle,
  faFileUpload,
  faFolder,
  faFolderOpen,
  faFolderPlus,
  faLayerGroup,
  faSearch,
  faSort,
  faTrash,
  faUpload,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../share/button/IconButton";
import clsx from "clsx";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import FileIcon from "./FileIcon";
import InlineInput from "../share/InlineInput";
import { useResources } from "./state";

export type TResourceExplorerProps = {
  onClose?: () => void;
};
export default function ResourceExplorer(props: TResourceExplorerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [resources, state] = useResources(ROOT_DIRECTORY);
  return (
    <div className="rounded-lg p-2 w-full">
      <Actions onClose={props.onClose} />
      <div className="flex flex-col gap-2 p-2 text-sm">
        <div className="flex flex-row gap-2 p-2 items-center text-blue-500">
          <FontAwesomeIcon icon={faLayerGroup} />
          <h6 className="font-bold">All files</h6>
        </div>
        {resources.map((item) =>
          item.isDirectory ? <ResourceGroup key={item._id} item={item} /> : <ResourceItem key={item._id} item={item} />
        )}
      </div>
    </div>
  );
}

export type TResourceItemProps = {
  item: TResourceItem;
};

export type TActionProps = {
  onClose?: () => void;
};

export function Actions(props: TActionProps) {
  const [searching, setSearching] = useState(false);
  return (
    <div className="p-2 flex flex-row gap-1 items-center">
      <div className="flex-1 h-10 px-2">{searching && <InlineInput placeholder="Search" />}</div>
      <IconButton icon={faSearch} onClick={() => setSearching(!searching)} />
      <IconButton icon={faSort} />
      <IconButton icon={faFolderPlus} />
      <IconButton icon={faUpload} />
      <IconButton icon={faXmarkCircle} />
    </div>
  );
}

export function ResourceGroup(props: TResourceItemProps) {
  const { value: expand, toggle } = useBoolean(false);
  return (
    <div className="flex flex-col px-2">
      <div className="flex flex-row gap-2 items-center font-normal group">
        <div
          className={clsx([
            "p-2 flex-1 flex flex-row ",
            "group-hover:bg-slate-200 text-slate-700",
            "rounded-lg cursor-pointer",
            "items-center",
            "duration-500",
          ])}
          onClick={toggle}
        >
          <FontAwesomeIcon icon={faCaretRight} className={clsx([expand && "rotate-90", "duration-500 px-2 "])} />
          <FontAwesomeIcon icon={expand ? faFolderOpen : faFolder} className="px-2 text-xs" />
          <span className="flex-1 font-bold px-2 select-none">{props.item.title}</span>
          <ResoureActions item={props.item} />
        </div>
      </div>
      {expand && <ResourceChildren item={props.item} />}
    </div>
  );
}

export function ResourceChildren(props: TResourceItemProps) {
  const [children, state] = useResources(props.item._id);
  return (
    <div className="pl-5">
      <div className="flex flex-col border-l-[1px] border-slate-200">
        {children.map((item) =>
          item.isDirectory ? <ResourceGroup key={item._id} item={item} /> : <ResourceItem key={item._id} item={item} />
        )}
      </div>
    </div>
  );
}

export function ResourceItem(props: TResourceItemProps) {
  return (
    <div className="px-2 flex flex-row gap-2 items-center font-normal group text-slate-600">
      <div
        className={clsx([
          "p-2 flex-1 flex flex-row group-hover:bg-slate-200",
          "rounded-lg cursor-pointer",
          "items-center",
          "duration-500",
        ])}
      >
        <FileIcon className="px-2 text-xs" type={props.item.file!.mineType} />
        <span className="flex-1 px-2 select-none">{props.item.title}</span>
        <ResoureActions item={props.item} />
      </div>
    </div>
  );
}

export function ResoureActions(props: { item: TResourceItem }) {
  return (
    <div className="hidden group-hover:flex flex-row items-center -m-2 px-2">
      <IconButton className="w-6 h-6" icon={faUpload} />
      <IconButton className="w-6 h-6" icon={faFolder} />
      <IconButton className="w-6 h-6" icon={faTrash} />
    </div>
  );
}
