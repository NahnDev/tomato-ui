"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import IconButton from "../share/button/IconButton";
import useQueryParam from "@/hooks/useQueryParam";
import { TPlaning } from "@/types/plan";

export default function PlaningHeader(props: { planing: TPlaning; isMaster: boolean }) {
  const [menu, setMenu] = useQueryParam<"open" | "close">("menu");
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-2 p-2 ">
        <Link href="./">
          <FontAwesomeIcon icon={faList} />
        </Link>
        <h3 className="font-bold uppercase">{props.planing.title}</h3>
      </div>
      <div className="flex-1"></div>
      {props.isMaster && (
        <div className="flex flex-row items-center gap-2 p-2 bg-white rounded-lg">
          <IconButton icon={faList} onClick={() => setMenu(menu === "open" ? "close" : "open")} />
        </div>
      )}
    </div>
  );
}
