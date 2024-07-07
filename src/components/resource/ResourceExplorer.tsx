import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROOT_DIRECTORY } from "./seed";
import { faFolderPlus, faLayerGroup, faSearch, faTrash, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../share/button/IconButton";
import { useEffect, useState } from "react";
import InlineInput from "../share/InlineInput";
import { resourceSelectedState, selectedSelector, useResourceCreateHandler, useResourceRemoveHandler } from "./state";
import UploadButton from "./UploadButton";
import { ResourceChildren } from "./ResourceItem";
import AsyncButton from "../share/button/AsyncButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useResetRecoilState } from "recoil";
export type TResourceExplorerProps = {
  onClose?: () => void;
};
export default function ResourceExplorer(props: TResourceExplorerProps) {
  const reset = useResetRecoilState(resourceSelectedState);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <div className="fluid rounded-lg p-2 grid grid-rows-[auto_1fr]">
      <Actions onClose={props.onClose} />
      <div className="flex flex-col gap-2 p-2 text-sm h-full overflow-auto">
        <div className="flex flex-row gap-2 p-2 items-center text-blue-500">
          <FontAwesomeIcon icon={faLayerGroup} />
          <h6 className="font-bold">All files</h6>
        </div>
        <DndProvider backend={HTML5Backend}>
          <ResourceChildren directory={ROOT_DIRECTORY} />
        </DndProvider>
      </div>
    </div>
  );
}

export type TActionProps = {
  onClose?: () => void;
};

export function Actions(props: TActionProps) {
  const [searching, setSearching] = useState(false);

  const create = useResourceCreateHandler(() => {});
  const remove = useResourceRemoveHandler(() => {});

  return (
    <div className="p-2 flex flex-row gap-1 items-center">
      <div className="flex-1 h-10 px-2">
        {searching ? (
          <InlineInput placeholder="Search" />
        ) : (
          <div className="flex flex-row gap-1">
            <UploadButton />
            <AsyncButton icon={faFolderPlus} onClick={create} variant="text" className="size-8 p-0 rounded-full" />
            <AsyncButton icon={faTrash} onClick={remove} variant="text" className="size-8 p-0 rounded-full" />
          </div>
        )}
      </div>
      <IconButton icon={faSearch} onClick={() => setSearching(!searching)} />
      <IconButton icon={faXmarkCircle} onClick={props.onClose} />
    </div>
  );
}
