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
  faCheckCircle,
  faChevronCircleRight,
  faCircleDot,
  faClock,
  faFile,
  faFileAudio,
  faImage,
  faRadiation,
  faRadio,
  faSquareCaretDown,
  faT,
  faTextHeight,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import UploaderImage from "@/components/share/builder/controls/UploaderImage";
import UploaderAudio from "@/components/share/builder/controls/UploaderAudio";
import UploaderFile from "@/components/share/builder/controls/UploaderFile";
import UploaderVideo from "@/components/share/builder/controls/UploaderVideo";
import { TControlSetting } from "@/types/control";
import Checkbox from "@/components/share/builder/controls/Checkbox";
import Radio from "@/components/share/builder/controls/Radio";
import { faDropbox } from "@fortawesome/free-brands-svg-icons";
import Dropdown from "@/components/share/builder/controls/Dropdown";

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
  // Signature = "SIGNATURE",
  Image = "IMAGE",
  Video = "VIDEO",
  Audio = "AUDIO",
  File = "FILE",
  Checkbox = "CHECKBOX",
  Radio = "RADIO",
  Dropdown = "DROPDOWN",
  // Rating = "RATING",
  // Slider = "SLIDER",
  // Range = "RANGE",
  // Star = "STAR",
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
  [ControlType.Image]: { icon: faImage, label: "Image" },
  [ControlType.Video]: { icon: faVideo, label: "Video" },
  [ControlType.Audio]: { icon: faFileAudio, label: "Audio" },
  [ControlType.File]: { icon: faFile, label: "File" },
  [ControlType.Checkbox]: { icon: faCheckCircle, label: "Checkbox" },
  [ControlType.Radio]: { icon: faCircleDot, label: "Radio" },
  [ControlType.Dropdown]: { icon: faSquareCaretDown, label: "Dropdown" },
};

export const DEFAULT_SETTINGS: { [key in ControlType]: Partial<TControlSetting> } = {
  [ControlType.ShortText]: {},
  [ControlType.LongText]: {},
  [ControlType.ButtonNext]: { label: "Button next", background: "#ff0000" },
  [ControlType.Space]: {},
  [ControlType.Label]: { label: "Label", textStyles: { color: "#000000", fontSize: 24, fontWeight: 700 } },
  [ControlType.Datetime]: { label: "Datetime" },
  [ControlType.Date]: { label: "Date" },
  [ControlType.Time]: { label: "Time" },
  [ControlType.DateRange]: {},
  [ControlType.TimeRange]: {},
  [ControlType.Image]: { label: "Image uploader", size: { w: 2, h: 2 }, layout: { minH: 2, minW: 2 } },
  [ControlType.Video]: { label: "Video uploader", size: { w: 2, h: 2 }, layout: { minH: 2, minW: 2 } },
  [ControlType.Audio]: { label: "Audio uploader", size: { w: 2, h: 2 }, layout: { minH: 2, minW: 2 } },
  [ControlType.File]: { label: "File uploader", size: { w: 2, h: 2 }, layout: { minH: 2, minW: 2 } },
  [ControlType.Checkbox]: {
    label: "Checkbox",
    size: { w: 2, h: 2 },
    layout: { minH: 2, minW: 2 },
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
  },
  [ControlType.Radio]: {
    label: "Radio",
    size: { w: 2, h: 2 },
    layout: { minH: 2, minW: 2 },
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
  },
  [ControlType.Dropdown]: {
    label: "Dropdown",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
  },
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
  { label: "Media", types: [ControlType.Image, ControlType.Video, ControlType.Audio, ControlType.File] },
  { label: "Option", types: [ControlType.Checkbox, ControlType.Radio, ControlType.Dropdown] },
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
  [ControlType.Image]: UploaderImage,
  [ControlType.Video]: UploaderVideo,
  [ControlType.Audio]: UploaderAudio,
  [ControlType.File]: UploaderFile,
  [ControlType.Checkbox]: Checkbox,
  [ControlType.Radio]: Radio,
  [ControlType.Dropdown]: Dropdown,
};
