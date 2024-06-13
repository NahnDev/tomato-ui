import useQueryParam from "@/hooks/useQueryParam";
import {
  faCalendar,
  faChartBar,
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Dialog, IconButton } from "@material-tailwind/react";
import clsx from "clsx";
import moment from "moment";
import React, { PropsWithChildren } from "react";
import LeaveForm from "./LeaveCreator";
import { useBoolean } from "usehooks-ts";

export const LEAVE_CALENDAR_TYPES = {
  MONTH: "month",
  WEEK: "week",
};
export const LEAVE_VIEWS = {
  CALENDAR: "calendar",
  STATISTICAL: "statistical",
  APPROVAL: "approval",
};

export default function Toolbar() {
  const [view, setView] = useQueryParam("view", { initial: LEAVE_VIEWS.CALENDAR });
  const [type, setType] = useQueryParam("type", { initial: LEAVE_CALENDAR_TYPES.MONTH });
  const [date, setDate] = useQueryParam("date", { initial: new Date().toISOString() });
  const { value: createdDialogShown, setFalse: close, setTrue: open } = useBoolean();

  const handlePrevious = () => {
    const unit = type === LEAVE_CALENDAR_TYPES.MONTH ? "months" : "weeks";
    setDate(moment(date).subtract(1, unit).toISOString());
  };
  const handleNext = () => {
    const unit = type === LEAVE_CALENDAR_TYPES.MONTH ? "months" : "weeks";
    setDate(moment(date).add(1, unit).toISOString());
  };

  return (
    <div className="p-2">
      <div className="flex flex-row gap-2">
        <ButtonGroup className="rounded-md overflow-hidden">
          <ControlButton onClick={() => setView(LEAVE_VIEWS.CALENDAR)} active={LEAVE_VIEWS.CALENDAR === view}>
            <div className="flex flex-row item-centers">
              <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
              <span className="px-2">Calendar</span>
            </div>
          </ControlButton>
          <ControlButton onClick={() => setView(LEAVE_VIEWS.STATISTICAL)} active={LEAVE_VIEWS.STATISTICAL === view}>
            <div className="flex flex-row item-centers">
              <FontAwesomeIcon icon={faChartBar}></FontAwesomeIcon>
              <span className="px-2">Statistical</span>
            </div>
          </ControlButton>
          <ControlButton onClick={() => setView(LEAVE_VIEWS.APPROVAL)} active={LEAVE_VIEWS.APPROVAL === view}>
            <div className="flex flex-row item-centers">
              <FontAwesomeIcon icon={faCheckDouble}></FontAwesomeIcon>
              <span className="px-2">Approval</span>
            </div>
          </ControlButton>
        </ButtonGroup>
        <ButtonGroup className="rounded-md overflow-hidden">
          <IconButton onClick={open}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </IconButton>
        </ButtonGroup>
        <div className="flex-1"></div>
        <div className={clsx("flex flex-row gap-2", view !== LEAVE_VIEWS.CALENDAR && "hidden")}>
          <ButtonGroup className="rounded-md overflow-hidden">
            <ControlButton
              onClick={() => setType(LEAVE_CALENDAR_TYPES.MONTH)}
              active={LEAVE_CALENDAR_TYPES.MONTH === type}
            >
              Month
            </ControlButton>
            <ControlButton
              onClick={() => setType(LEAVE_CALENDAR_TYPES.WEEK)}
              active={LEAVE_CALENDAR_TYPES.WEEK === type}
            >
              Week
            </ControlButton>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton onClick={handlePrevious}>
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </IconButton>
            <IconButton onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
      <Dialog open={createdDialogShown} handler={close}>
        <LeaveForm onClose={close} />
      </Dialog>
    </div>
  );
}

function ControlButton(props: Readonly<PropsWithChildren<{ onClick: () => any; active: boolean }>>) {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.active}
      className={clsx([props.active && "bg-red-500", "rounded-none disabled:opacity-100"])}
    >
      {props.children}
    </Button>
  );
}
