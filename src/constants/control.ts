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
  faImage,
  faListCheck,
  faMicrophone,
  faParagraph,
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
import CheckboxGroup from "@/components/share/builder/controls/CheckboxGroup";
import Dropdown from "@/components/share/builder/controls/Dropdown";
import Signature from "@/components/share/builder/controls/Signature";
import ButtonSubmit from "@/components/share/builder/controls/ButtonSubmit";
import Heading from "@/components/share/builder/controls/Heading";
import TextStyleSetting, { TextStyleDefaultSetting } from "@/components/share/builder/settings/TextStyleSetting";
import BaseSetting from "@/components/share/builder/settings/BaseSetting";
import DateSetting from "@/components/share/builder/settings/DateSetting";
import HeadingSetting from "@/components/share/builder/settings/HeadingSetting";
import SingleCheckbox from "@/components/share/builder/controls/Checkbox";
import ParagraphSetting from "@/components/share/builder/settings/ParagraphSetting";
import Paragraph from "@/components/share/builder/controls/Paragraph";
import BackgroundSetting from "@/components/share/builder/settings/BackgroundSetting";
import BorderSetting from "@/components/share/builder/settings/BorderSetting";
import { AllColors } from "./color";
import IconSetting from "@/components/share/builder/settings/IconSetting";
import OptionSetting, { OptionDefaultSetting } from "@/components/share/builder/settings/OptionSetting";
import PrefixSetting from "@/components/share/builder/settings/PrefixSetting";
import MockupSetting from "@/components/share/builder/settings/MockupSetting";
import Mockup from "@/components/share/builder/controls/Mockup";

export enum ControlType {
  Label = "Label",
  Paragraph = "Paragraph",
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
  CheckboxGroup = "CHECKBOX_GROUP",
  Dropdown = "DROPDOWN",
  Signature = "SIGNATURE",
  Mockup = "MOCKUP",
}

export interface ControlThumbnailInterface {
  icon: IconDefinition;
  label: string;
}
export const THUMBNAILS: { [key in ControlType]: ControlThumbnailInterface } = {
  [ControlType.Label]: { icon: faTextHeight, label: "Label" },
  [ControlType.Paragraph]: { icon: faParagraph, label: "Paragraph" },
  [ControlType.ShortText]: { icon: faT, label: "Single line" },
  [ControlType.LongText]: { icon: faAlignLeft, label: "Multiple line" },
  [ControlType.ButtonNext]: { icon: faChevronCircleRight, label: "Next step" },
  [ControlType.Space]: { icon: faBorderTopLeft, label: "Space" },
  [ControlType.Datetime]: { icon: faCalendar, label: "Datetime" },
  [ControlType.Date]: { icon: faCalendar, label: "Date" },
  [ControlType.Time]: { icon: faClock, label: "Time" },
  [ControlType.DateRange]: { icon: faCalendar, label: "Date Range" },
  [ControlType.TimeRange]: { icon: faClock, label: "Time Range" },
  [ControlType.Image]: { icon: faImage, label: "Image" },
  [ControlType.Video]: { icon: faVideo, label: "Video" },
  [ControlType.Audio]: { icon: faMicrophone, label: "Audio" },
  [ControlType.File]: { icon: faFile, label: "File" },
  [ControlType.CheckboxGroup]: { icon: faListCheck, label: "Checkbox" },
  [ControlType.Dropdown]: { icon: faSquareCaretDown, label: "Dropdown" },
  [ControlType.Signature]: { icon: faSignature, label: "Signature" },
  [ControlType.ButtonSubmit]: { icon: faCheckCircle, label: "Submit" },
  [ControlType.Heading]: { icon: faTextHeight, label: "Heading" },
  [ControlType.Checkbox]: { icon: faCheckCircle, label: "Checkbox" },
  [ControlType.Mockup]: { icon: faImage, label: "Mockup" },
};

export const DEFAULT_SETTINGS: { [key in ControlType]: Partial<TControlSetting> } = {
  [ControlType.Label]: { label: "Label", textStyles: { fontSize: 16, fontWeight: 700, textAlign: "center" } },
  [ControlType.Paragraph]: { label: "Paragraph", textStyles: TextStyleDefaultSetting },

  [ControlType.ShortText]: {},
  [ControlType.LongText]: {},
  [ControlType.ButtonNext]: {
    label: "Button next",
    background: { backgroundColor: AllColors.MediumBlue },
    textStyles: { color: AllColors.White },
  },
  [ControlType.Space]: {},
  [ControlType.Datetime]: { label: "Datetime" },
  [ControlType.Date]: { label: "Date" },
  [ControlType.Time]: { label: "Time" },
  [ControlType.DateRange]: {},
  [ControlType.TimeRange]: {},
  [ControlType.Image]: { label: "Image uploader", size: { width: 2, height: 6 }, layout: { minH: 2, minW: 2 } },
  [ControlType.Video]: { label: "Video uploader", size: { width: 2, height: 6 }, layout: { minH: 2, minW: 2 } },
  [ControlType.Audio]: { label: "Audio uploader", size: { width: 2, height: 6 }, layout: { minH: 2, minW: 2 } },
  [ControlType.File]: { label: "File uploader", size: { width: 2, height: 6 }, layout: { minH: 2, minW: 2 } },
  [ControlType.CheckboxGroup]: { label: "Checkbox Group", options: OptionDefaultSetting },
  [ControlType.Checkbox]: {
    label: "Checkbox",
  },
  [ControlType.Dropdown]: {
    label: "Dropdown",
    options: OptionDefaultSetting,
  },
  [ControlType.Signature]: { label: "Signature", size: { width: 2, height: 2 }, layout: { minH: 2, minW: 2 } },
  [ControlType.ButtonSubmit]: { label: "Submit", bg: "#00ff00" },
  [ControlType.Heading]: {
    label: "Heading",
    textStyles: { color: "#000000", fontSize: 16, fontWeight: 700 },
    size: { width: 6, height: 1 },
    layout: { minW: 6 },
    heading: { level: 1, format: "$1.", color: "#000" },
  },
  [ControlType.Mockup]: {
    size: { width: 4, height: 4 },
    layout: { minW: 4, minH: 4 },
  },
};

export interface ControlGroupInterface {
  label: string;
  types: ControlType[];
}
export const GROUPS: ControlGroupInterface[] = [
  {
    label: "Texts",
    types: [ControlType.Label, ControlType.Paragraph, ControlType.LongText, ControlType.ShortText, ControlType.Heading],
  },
  { label: "Buttons", types: [ControlType.ButtonNext, ControlType.ButtonSubmit] },
  {
    label: "Datetimes",
    types: [ControlType.Date, ControlType.Time, ControlType.DateRange, ControlType.TimeRange, ControlType.Datetime],
  },
  { label: "Utils", types: [ControlType.Space, ControlType.Signature, ControlType.Mockup] },
  { label: "Medias", types: [ControlType.Image, ControlType.Video, ControlType.Audio, ControlType.File] },
  {
    label: "Options",
    types: [ControlType.Checkbox, ControlType.CheckboxGroup, ControlType.Dropdown],
  },
];

export const SETTINGS: { [key in ControlType]: any[] } = {
  [ControlType.Label]: [BaseSetting, TextStyleSetting],
  [ControlType.Paragraph]: [ParagraphSetting, TextStyleSetting, BackgroundSetting],

  [ControlType.ShortText]: [BaseSetting, TextStyleSetting],
  [ControlType.LongText]: [BaseSetting, TextStyleSetting],
  [ControlType.ButtonNext]: [BaseSetting, TextStyleSetting, BackgroundSetting, BorderSetting, IconSetting],
  [ControlType.ButtonSubmit]: [BaseSetting],
  [ControlType.Space]: [BaseSetting],
  [ControlType.Datetime]: [BaseSetting],
  [ControlType.Date]: [BaseSetting, DateSetting],
  [ControlType.Time]: [BaseSetting],
  [ControlType.DateRange]: [BaseSetting],
  [ControlType.TimeRange]: [BaseSetting],
  [ControlType.Image]: [BaseSetting],
  [ControlType.Video]: [BaseSetting],
  [ControlType.Audio]: [BaseSetting],
  [ControlType.File]: [BaseSetting],
  [ControlType.CheckboxGroup]: [BaseSetting, OptionSetting, PrefixSetting],
  [ControlType.Dropdown]: [BaseSetting, OptionSetting, PrefixSetting],
  [ControlType.Checkbox]: [BaseSetting, TextStyleSetting],
  [ControlType.Signature]: [BaseSetting],
  [ControlType.Heading]: [BaseSetting, HeadingSetting, TextStyleSetting],
  [ControlType.Mockup]: [BaseSetting, MockupSetting],
};

export const UI = {
  [ControlType.ShortText]: ShortText,
  [ControlType.LongText]: LongText,
  [ControlType.Datetime]: Datetime,
  [ControlType.Date]: Date,
  [ControlType.Time]: Time,
  [ControlType.Label]: Label,
  [ControlType.Paragraph]: Paragraph,
  [ControlType.ButtonNext]: ButtonNext,
  [ControlType.Space]: Space,
  [ControlType.DateRange]: DateRange,
  [ControlType.TimeRange]: TimeRange,
  [ControlType.Image]: UploaderImage,
  [ControlType.Video]: UploaderVideo,
  [ControlType.Audio]: UploaderAudio,
  [ControlType.File]: UploaderFile,
  [ControlType.CheckboxGroup]: CheckboxGroup,
  [ControlType.Dropdown]: Dropdown,
  [ControlType.Signature]: Signature,
  [ControlType.ButtonSubmit]: ButtonSubmit,
  [ControlType.Heading]: Heading,
  [ControlType.Checkbox]: SingleCheckbox,
  [ControlType.Mockup]: Mockup,
};
