import { Avatar, Button } from "@material-tailwind/react";
import { TMember } from "./type";
import { useMemo } from "react";
import PathUtil from "@/utils/PathUtil";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faFileText,
  faGripVertical,
  faMailBulk,
  faPaste,
  faPersonWalkingArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";

export type TMemberThumbnailProps = {
  item: TMember;
};

export default function MemberThumbnail(props: TMemberThumbnailProps) {
  const mailto = useMemo(() => `mailto:${props.item.mail}`, [props.item.mail]);

  return (
    <div
      className={clsx([
        "p-2 bg-white rounded-lg flex flex-row items-center gap-2 group",
        "border-2 hover:border-slate-500 duration-500",
        "overflow-hidden",
      ])}
    >
      <div className="opacity-50 px-2">
        <FontAwesomeIcon icon={faGripVertical} />
      </div>
      <div className="grid grid-cols-3 flex-1 gap-2">
        <div className="flex flex-row p-2 gap-4 items-center">
          <MemberAvatar item={props.item} />
          <div>
            <h6 className="font-bold">{props.item.name}</h6>
            <span className="flex flex-row gap-1 items-center">
              <div className="size-2 bg-green-500 rounded-full"></div>
              <h6 className="text-xs text-slate-500"> Active </h6>
            </span>
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-row gap-2 items-center text-sm">
            <FontAwesomeIcon icon={faMailBulk} />
            <h6 className="font-bold">Mail:</h6>
          </div>
          <a className="text-blue-500" href={mailto}>
            {props.item.mail}
          </a>
        </div>
      </div>
      <Actions item={props.item} />
    </div>
  );
}

export function MemberAvatar(props: { item: TMember }) {
  const src = useMemo(
    () => (props.item.avatar ? PathUtil.getPublicPath(props.item.avatar) : "/vercel.svg"),
    [props.item.avatar]
  );
  return (
    <div className="relative">
      <div className="size-10 border-2 border-slate-500 rounded-full overflow-hidden">
        <Image className="size-full" src={src} width={256} height={256} alt="" />
      </div>
    </div>
  );
}

export function Actions(props: { item: TMember }) {
  const informationPath = useMemo(() => `/members/informations?member=${props.item._id}`, [props.item._id]);
  const logPath = useMemo(() => `/members/logs?member=${props.item._id}`, [props.item._id]);
  const leavePath = useMemo(() => `/members/leaves?member=${props.item._id}`, [props.item._id]);

  return (
    <div className="flex flex-row gap-4 px-2  translate-x-full group-hover:translate-x-0 duration-500">
      <Link href={informationPath} className="flex flex-col text-sm text-cyan-700">
        <FontAwesomeIcon icon={faPaste} />
        <span>Informations</span>
      </Link>
      <Link href={logPath} className="flex flex-col text-sm text-slate-700">
        <FontAwesomeIcon icon={faFileText} />
        <span>Logs</span>
      </Link>
      <Link href={leavePath} className="flex flex-col text-sm text-slate-700">
        <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
        <span>Leaves</span>
      </Link>
      <div className="flex flex-col text-sm text-red-700 cursor-pointer">
        <FontAwesomeIcon icon={faBan} />
        <span>Block</span>
      </div>
    </div>
  );
}
