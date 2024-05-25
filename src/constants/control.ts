import ButtonNext from "@/components/share/builder/controls/ButtonNext";
import Datetime from "@/components/share/builder/controls/Datetime";
import Label from "@/components/share/builder/controls/Label";
import LongText from "@/components/share/builder/controls/LongText";
import ShortText from "@/components/share/builder/controls/ShortText";
import Space from "@/components/share/builder/controls/Space";
import Time from "@/components/share/builder/controls/Time";
import DateRange from "@/components/share/builder/controls/DateRange";
import TimeRange from "@/components/share/builder/controls/TimeRange";
import Date from "@/components/share/builder/controls/Date";

import {
  IconDefinition,
  faAlignLeft,
  faBorderTopLeft,
  faCalendar,
  faChevronCircleRight,
  faClock,
  faT,
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";

export enum ControlType {
  Label = "Label",
  ShortText = "SHORT_TEXT",
  LongText = "LONG_TEXT",
  ButtonNext = "BUTTON_NEXT",
  Space = "SPACE",
  Datetime = "DATETIME",
  Date = "Date",
  Time = "Time",
  DateRange = "DATE_RANGE",
  TimeRange = "TIME_RANGE",
}

export interface ControlThumbnailInterface {
  icon: IconDefinition;
  label: string;
}
export const THUMBNAILS: { [key in ControlType]: ControlThumbnailInterface } = {
  [ControlType.ShortText]: { icon: faT, label: "Single line" },
  [ControlType.LongText]: { icon: faAlignLeft, label: "Multiple line" },
  [ControlType.ButtonNext]: { icon: faChevronCircleRight, label: "Next step" },
  [ControlType.Space]: { icon: faBorderTopLeft, label: "Space" },
  [ControlType.Label]: { icon: faTextHeight, label: "Label" },
  [ControlType.Datetime]: { icon: faCalendar, label: "Datetime" },
  [ControlType.Date]: { icon: faCalendar, label: "Date" },
  [ControlType.Time]: { icon: faClock, label: "Time" },
  [ControlType.DateRange]: { icon: faCalendar, label: "Date Range" },
  [ControlType.TimeRange]: { icon: faClock, label: "Time Range" },
};

export const DEFAULT_SETTINGS: { [key in ControlType]: any } = {
  [ControlType.ShortText]: {},
  [ControlType.LongText]: {},
  [ControlType.ButtonNext]: { label: "Button next", background: "#ff0000" },
  [ControlType.Space]: {},
  [ControlType.Label]: { label: "string" },
  [ControlType.Datetime]: { label: "Datetime" },
  [ControlType.Date]: { label: "Date" },
  [ControlType.Time]: { label: "Time" },
  [ControlType.DateRange]: {},
  [ControlType.TimeRange]: {},
};

export interface ControlGroupInterface {
  label: string;
  types: ControlType[];
}
export const GROUPS: ControlGroupInterface[] = [
  { label: "Text", types: [ControlType.Label, ControlType.LongText, ControlType.ShortText] },
  { label: "Button", types: [ControlType.ButtonNext] },
  {
    label: "Datetime",
    types: [ControlType.Date, ControlType.Time, ControlType.DateRange, ControlType.TimeRange, ControlType.Datetime],
  },
  { label: "Util", types: [ControlType.Space] },
];

export const UI = {
  [ControlType.ShortText]: ShortText,
  [ControlType.LongText]: LongText,
  [ControlType.Datetime]: Datetime,
  [ControlType.Date]: Date,
  [ControlType.Time]: Time,
  [ControlType.Label]: Label,
  [ControlType.ButtonNext]: ButtonNext,
  [ControlType.Space]: Space,
  [ControlType.DateRange]: DateRange,
  [ControlType.TimeRange]: TimeRange,
};
