import {
  fa1,
  faCheckCircle,
  faEllipsisV,
  faGripVertical,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import clsx from "clsx";
import React from "react";
import IconButton from "../share/button/IconButton";
import useQueryParam from "@/hooks/useQueryParam";

const steps = [
  {
    id: "1",
    name: "Step with content",
    desc: "This is a description of the step",
    meta: ["Le Thanh Nhan - 23/09/2021", "2 days ago"],
  },
  {
    id: "2",
    name: "Step Finalized",
    desc: "This is a description of the step",
    meta: ["Le Thanh Nhan - 23/09/2021", "1 days ago"],
  },
];

export default function TemplateStepper() {
  const [stepActive, setStepActive] = useQueryParam("step");
  return (
    <div className="p-2">
      {steps.map((step, index) => (
        <TemplateStep
          key={step.id}
          index={index + 1}
          name={step.name}
          desc={step.desc}
          meta={step.meta}
          active={stepActive === step.id}
          onClick={() => setStepActive(step.id)}
        />
      ))}
      <TemplateStepCreator />
    </div>
  );
}

function TemplateStepCreator() {
  return (
    <div className="flex flex-row items-center gap-4 p-4">
      <div
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

function TemplateStep(
  props: Readonly<{ index: number; name: string; desc: string; meta: string[]; active?: boolean; onClick?: () => any }>
) {
  return (
    <div className="flex flex-col p-1 cursor-pointer group">
      <div className="flex flex-row items-center gap-4 p-4 pr-0">
        <div
          className={clsx([
            "before:content-[' ']  before:w-[10em] before:h-full before:absolute before:right-1/2 before:-z-10",
            "relative rounded-full w-6 h-6 flex flex-row justify-center items-center text-white text-sm font-bold z-10",
            props.active ? "bg-red-500 before:bg-red-500" : "bg-slate-900 before:bg-slate-900",
          ])}
        >
          {props.index}
        </div>
        <Typography
          onClick={props.onClick}
          as="h6"
          className={clsx(["font-bold", props.active ? "text-red-500" : "text-slate-900"])}
        >
          {props.name}
        </Typography>
        <div className="flex-1"></div>
        <IconButton className="opacity-0 group-hover:opacity-100 duration-500 rounded-full" icon={faEllipsisV} />
      </div>
      <div className="pl-2">
        <Typography as="p" className="text-sm text-slate-500">
          {props.desc}
        </Typography>
        <div className="text-xs text-slate-400 py-2">
          {props.meta.map((item, index) => (
            <div key={index} className="flex flex-row  items-center">
              <Typography as="span" className="text-xs px-1">
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
