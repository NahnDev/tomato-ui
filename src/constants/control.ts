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
  faMicrophone,
  faRadiation,
  faRadio,
  faSignature,
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
import Signature from "@/components/share/builder/controls/Signature";
import ButtonSubmit from "@/components/share/builder/controls/ButtonSubmit";
import Heading from "@/components/share/builder/controls/Heading";
import TextStyleSetting, { TextStyleDefaultSetting } from "@/components/share/builder/settings/TextStyleSetting";
import BaseSetting from "@/components/share/builder/settings/BaseSetting";
import DateSetting from "@/components/share/builder/settings/DateSetting";

export enum ControlType {
  Label = "Label",
  Heading = "Heading",
  ShortText = "SHORT_TEXT",
  LongText = "LONG_TEXT",
  ButtonNext = "BUTTON_NEXT",
  ButtonSubmit = "BUTTON_SUBMIT",
  Space = "SPACE",
  Datetime = "DATETIME",
  Date = "Date",
  Time = "Time",
  DateRange = "DATE_RANGE",
  TimeRange = "TIME_RANGE",
  Image = "IMAGE",
  Video = "VIDEO",
  Audio = "AUDIO",
  File = "FILE",
  Checkbox = "CHECKBOX",
  Radio = "RADIO",
  Dropdown = "DROPDOWN",
  Signature = "SIGNATURE",
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
  [ControlType.Audio]: { icon: faMicrophone, label: "Audio" },
  [ControlType.File]: { icon: faFile, label: "File" },
  [ControlType.Checkbox]: { icon: faCheckCircle, label: "Checkbox" },
  [ControlType.Radio]: { icon: faCircleDot, label: "Radio" },
  [ControlType.Dropdown]: { icon: faSquareCaretDown, label: "Dropdown" },
  [ControlType.Signature]: { icon: faSignature, label: "Signature" },
  [ControlType.ButtonSubmit]: { icon: faCheckCircle, label: "Submit" },
  [ControlType.Heading]: { icon: faTextHeight, label: "Heading" },
};

export const DEFAULT_SETTINGS: { [key in ControlType]: Partial<TControlSetting> } = {
  [ControlType.ShortText]: {},
  [ControlType.LongText]: {},
  [ControlType.ButtonNext]: { label: "Button next", background: "#ff0000" },
  [ControlType.Space]: {},
  [ControlType.Label]: { label: "Label", textStyles: TextStyleDefaultSetting },
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
  [ControlType.Signature]: { label: "Signature", size: { w: 2, h: 2 }, layout: { minH: 2, minW: 2 } },
  [ControlType.ButtonSubmit]: { label: "Submit", background: "#00ff00" },
  [ControlType.Heading]: {
    label: "Heading",
    textStyles: { color: "#000000", fontSize: 16, fontWeight: 700 },
    size: { w: 6, h: 1 },
    layout: { minW: 6 },
  },
};

export interface ControlGroupInterface {
  label: string;
  types: ControlType[];
}
export const GROUPS: ControlGroupInterface[] = [
  { label: "Texts", types: [ControlType.Label, ControlType.LongText, ControlType.ShortText, ControlType.Heading] },
  { label: "Buttons", types: [ControlType.ButtonNext, ControlType.ButtonSubmit] },
  {
    label: "Datetimes",
    types: [ControlType.Date, ControlType.Time, ControlType.DateRange, ControlType.TimeRange, ControlType.Datetime],
  },
  { label: "Utils", types: [ControlType.Space, ControlType.Signature] },
  { label: "Medias", types: [ControlType.Image, ControlType.Video, ControlType.Audio, ControlType.File] },
  { label: "Options", types: [ControlType.Checkbox, ControlType.Radio, ControlType.Dropdown] },
];

export const SETTINGS: { [key in ControlType]: any[] } = {
  [ControlType.ShortText]: [BaseSetting, TextStyleSetting],
  [ControlType.LongText]: [BaseSetting, TextStyleSetting],
  [ControlType.ButtonNext]: [BaseSetting],
  [ControlType.Space]: [BaseSetting],
  [ControlType.Label]: [BaseSetting, TextStyleSetting],
  [ControlType.Datetime]: [BaseSetting],
  [ControlType.Date]: [BaseSetting, DateSetting],
  [ControlType.Time]: [BaseSetting],
  [ControlType.DateRange]: [BaseSetting],
  [ControlType.TimeRange]: [BaseSetting],
  [ControlType.Image]: [BaseSetting],
  [ControlType.Video]: [BaseSetting],
  [ControlType.Audio]: [BaseSetting],
  [ControlType.File]: [BaseSetting],
  [ControlType.Checkbox]: [BaseSetting],
  [ControlType.Radio]: [BaseSetting],
  [ControlType.Dropdown]: [BaseSetting],
  [ControlType.Signature]: [BaseSetting],
  [ControlType.ButtonSubmit]: [BaseSetting],
  [ControlType.Heading]: [BaseSetting, TextStyleSetting],
};

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
  [ControlType.Signature]: Signature,
  [ControlType.ButtonSubmit]: ButtonSubmit,
  [ControlType.Heading]: Heading,
};
