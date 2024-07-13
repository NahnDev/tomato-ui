import ResourceApi from "@/api/ResourceApi";
import ResourcePicker from "@/components/resource/ResourcePicker";
import { TResourceItem } from "@/components/resource/type";
import { faCheckCircle, faCircle, faCircleCheck, faFileCsv, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Option, Select } from "@material-tailwind/react";
import clsx from "clsx";
import { PropsWithChildren, useCallback, useMemo, useRef, useState } from "react";
import { useStoryImportHandler } from "./stories";
import { TPlanning } from "@/types/plan";
import AsyncButton from "@/components/share/button/AsyncButton";

enum StepStatus {
  Prepare = "prepare",
  Loading = "loading",
  Success = "success",
}
export function getStatus(condition: number): StepStatus {
  if (condition < 0) return StepStatus.Prepare;
  if (condition === 0) return StepStatus.Loading;
  if (condition > 0) return StepStatus.Success;
  return StepStatus.Prepare;
}

export default function AddFromCSV(props: { onClose: () => any; planning: TPlanning }) {
  const [resource, setResource] = useState<TResourceItem>();
  const [columns, setColumns] = useState<string[]>([]);
  const [column, setColumn] = useState<string>();
  const [success, setSuccess] = useState(false);
  const importStories = useStoryImportHandler(props.planning._id, () => {
    setSuccess(true);
    props.onClose();
  });

  const stepIndex = useMemo(() => {
    if (!columns.length) return 1;
    if (!success) return 2;
    return 3;
  }, [columns, success]);

  const handleFileSelected = (resource: TResourceItem) => {
    setResource(resource);
    ResourceApi.getCsvHeader(resource._id).then((header) => {
      setColumns(header);
    });
  };

  if (!resource) return <ResourcePicker onSubmit={handleFileSelected} onClose={props.onClose} filter={/text\/csv/} />;
  return (
    <Dialog open={!!resource} handler={props.onClose} size="xs">
      <div className="bg-white px-4 py-8 rounded-lg">
        <div className="flex flex-row items-center text-green-500 gap-4 px-4">
          <FontAwesomeIcon icon={faFileCsv} className="text-2xl rounded-full" />
          <div>
            <h6 className="font-bold text-2xl ">Import from CSV</h6>
            <div className="flex flex-row gap-2">
              <div className="flex-1 flex-row gap-1 text-xs">
                <span className="text-slate-700">From</span>
                <span className="text-blue-500 text-bold"> {resource.title}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8">
          <Step label="Get file informations" status={getStatus(stepIndex - 1)} />
          <Step label="Select column" status={getStatus(stepIndex - 2)}>
            <div className="p-4 gap-2 flex flex-row">
              <Select
                className="flex-1"
                label="Header"
                size="md"
                menuProps={{ className: "h-80" }}
                onChange={(val) => setColumn(val)}
              >
                {columns.map((header, index) => (
                  <Option key={index} value={header}>
                    {header}
                  </Option>
                ))}
              </Select>
              <AsyncButton
                className="bg-green-500"
                disabled={!column}
                icon={faCircleCheck}
                label="Import"
                onClick={() => importStories(resource!._id, column!)}
              />
            </div>
          </Step>
        </div>
      </div>
    </Dialog>
  );
}

function Step(props: PropsWithChildren<{ label: string; status: StepStatus }>) {
  const isPrepare = props.status === StepStatus.Prepare;
  const isSuccess = props.status === StepStatus.Success;
  const isLoading = props.status === StepStatus.Loading;

  return (
    <div className="p-2 text-sm">
      <div className="flex flex-row gap-4 px-4 items-center font-bold  ">
        {isPrepare && <FontAwesomeIcon icon={faCircle} className="text-slate-500" />}
        {isSuccess && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
        {isLoading && <FontAwesomeIcon icon={faSpinner} className="text-blue-500 animate-spin" />}

        <span className={clsx([isSuccess && "line-through"])}>{props.label} </span>
      </div>
      {!isPrepare && props.children}
    </div>
  );
}
