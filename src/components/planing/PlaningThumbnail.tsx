import { TPlaning } from "@/types/plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";
import { useMemo } from "react";

export default function PlaningThumbnail(props: { item: TPlaning; index: number }) {
  const admins = useMemo(() => {
    return props.item.masters.map((admin) => admin.name).join(", ");
  }, [props.item.masters]);
  const color = useMemo(() => {
    return props.item.color;
  }, [props.item.color]);

  return (
    <div
      className={clsx([
        "relative z-0 border-2 border-transparent",
        "py-4 px-10 bg-white rounded-lg overflow-hidden group duration-1000",
        "hover:translate-x-2  hover:border-slate-500",
      ])}
    >
      <div className={clsx(["flex flex-col items-end"])}>
        <div className={clsx(["py-4 flex flex-col items-end"])}>
          <h1 className="text-4xl text-slate-700">{props.item.title}</h1>
          <div>
            <span className="text-sm text-slate-500">Admins: {admins}</span>
          </div>
        </div>
        <Link
          href={`/planing/${props.item._id}`}
          className={clsx([
            " flex flex-row gap-2 items-center rounded-lg ",
            "px-4 py-2",
            " text-white",
            "hover:scale-105 duration-1000",
          ])}
          style={{ backgroundColor: color }}
        >
          <FontAwesomeIcon icon={faRightLong} />
          <span>Join room</span>
        </Link>
      </div>
      <Backdrop color={color} />
    </div>
  );
}

function Backdrop(props: { color: string }) {
  const { color } = props;
  return (
    <div
      className={clsx([
        "absolute size-[2em] opacity-100 rounded-full -top-[1em] -z-10",
        "right-0 translate-x-1/2",
        "scale-0 group-hover:scale-[5000%] duration-1000 group-hover:opacity-0",
      ])}
      style={{ backgroundColor: color }}
    ></div>
  );
}
