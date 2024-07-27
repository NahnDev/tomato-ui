import {
  fa1,
  faCheckCircle,
  faEllipsisV,
  faGripVertical,
  faPlus,
  faPlusCircle,
  faRotate,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import IconButton from "../share/button/IconButton";
import useQueryParam from "@/hooks/useQueryParam";
import { faNodeJs } from "@fortawesome/free-brands-svg-icons";
import {
  useStepCreator,
  useStepReorder,
  useSteps,
  useStepSelected,
  useStepSelector,
  useStepUpdater,
} from "../share/builder/state/step";
import AsyncButton from "../share/button/AsyncButton";
import { Step } from "@/types/control";
import { ReactSortable } from "react-sortablejs";

export default function TemplateStepper() {
  const steps = useSteps();
  const selected = useStepSelected();
  const selectStep = useStepSelector();
  const reorder = useStepReorder();

  return (
    <div className="px-2  w-80">
      <div className="flex flex-col items-center p-4">
        <div className="flex flex-row gap-4 font-bold text-slate-700 text-2xl">
          <FontAwesomeIcon icon={faNodeJs}></FontAwesomeIcon>
          <h6>Template name</h6>
        </div>
      </div>

      <ReactSortable list={steps.map(({ id }) => ({ id }))} setList={(list) => reorder(list.map(({ id }) => id))}>
        {steps.map((step, index) => (
          <TemplateStep
            key={step.id}
            index={index + 1}
            item={step}
            active={selected?.id === step.id}
            onClick={() => selectStep(step.id)}
          />
        ))}
      </ReactSortable>
      <TemplateStepCreator />
    </div>
  );
}

function TemplateStepCreator() {
  const createStep = useStepCreator();
  return (
    <div className="flex flex-row items-center gap-4">
      <div
        onClick={() => createStep("A new step", "")}
        className={clsx([
          "before:content-[' ']  before:w-[20em] before:h-full before:absolute before:right-1/2 before:-z-10",
          "relative rounded-full w-6 h-6 flex flex-row justify-center items-center text-white text-sm font-bold z-10",
          "bg-slate-500 before:bg-slate-500",
        ])}
      >
        <FontAwesomeIcon className="cursor-pointer" icon={faPlusCircle} />
      </div>
    </div>
  );
}

function TemplateStep(props: Readonly<{ index: number; item: Step; active?: boolean; onClick?: () => any }>) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [modifies, setModifies] = useState<Partial<Step>>({});
  const update = useStepUpdater();

  const onStartEditing = () => {
    setEditing(true);
  };
  const onCancelEditing = () => {
    setEditing(false);
    // setModifies({});
  };
  const onSubmitEditing = () => {
    update({ ...modifies, id: props.item.id });
    setEditing(false);
    // setModifies({});
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitEditing();
    } else if (e.key === "Escape") {
      onCancelEditing();
    }
  };

  const name = useMemo(() => modifies.name ?? props.item.name, [modifies, props.item]);
  const desc = useMemo(() => modifies.desc ?? props.item.desc, [modifies, props.item]);
  const meta = useMemo(() => modifies.meta ?? props.item.meta, [modifies, props.item]);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);
  return (
    <div className="flex flex-col p-1 cursor-pointer group">
      <div className="flex flex-row items-start gap-2 p-2 pr-0">
        <div
          className={clsx([
            "before:content-[' ']  before:w-[10em] before:h-full before:absolute before:right-1/2 before:-z-10",
            "relative rounded-full w-6 h-6 min-w-6 flex flex-row justify-center items-center text-white text-sm font-bold z-10",
            props.active ? "bg-red-500 before:bg-red-500" : "bg-slate-900 before:bg-slate-900",
          ])}
        >
          {props.index}
        </div>
        <div
          onClick={props.onClick}
          onDoubleClick={onStartEditing}
          className={clsx(["font-bold cursor-pointer w-full"])}
        >
          {editing ? (
            <input
              ref={ref}
              defaultValue={name}
              onBlur={onSubmitEditing}
              onKeyDown={onKeyDown}
              onChange={(e) => setModifies({ ...modifies, name: e.target.value })}
              className={clsx(["bg-transparent border-none outline-none text-slate-900 w-full"])}
            />
          ) : (
            <span className={clsx([props.active ? "text-red-500" : "text-slate-900"])}>{name}</span>
          )}
        </div>
        <div className="flex-1"></div>
        <IconButton className="opacity-0 group-hover:opacity-100 duration-500 rounded-full" icon={faEllipsisV} />
      </div>
      <div className="pl-2">
        <Typography as="p" className="text-sm text-slate-900">
          {desc}
        </Typography>
        <div className="text-xs text-slate-400 py-2">
          <div className="flex flex-row  items-center">
            <Typography as="span" className="text-xs px-1">
              {meta}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
