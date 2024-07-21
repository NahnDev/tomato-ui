"use client";

import {
  faFileText,
  faInfoCircle,
  faPaste,
  faPeopleGroup,
  faPersonWalkingArrowRight,
  faUsersBetweenLines,
} from "@fortawesome/free-solid-svg-icons";
import LinkMenu from "../LinkMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function MemberNavigator() {
  return (
    <div className="w-80 bg-white rounded-lg p-8">
      <ul className="p-2">
        <Link href={"/members"} className="flex flex-row items-center gap-2 font-bold">
          <FontAwesomeIcon icon={faPeopleGroup} />
          <h6 className="">All employee</h6>
        </Link>
      </ul>
      <h6 className="pt-4 text-teal-700 font-bold">Details</h6>
      <ul className="flex flex-col gap-2 py-4 px-2">
        <LinkMenu className="p-2" href="/members/profil" icon={faPaste}>
          Informations
        </LinkMenu>
        <LinkMenu className="p-2" href="/members/leave" icon={faFileText}>
          Logs
        </LinkMenu>
        <LinkMenu className="p-2" href="/members/leave" icon={faPersonWalkingArrowRight}>
          Leave
        </LinkMenu>
      </ul>
    </div>
  );
}
