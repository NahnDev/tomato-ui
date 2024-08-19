import { APP_ICONS } from "@/constants/icon";
import { leaves } from "@/seed/leave";
import { LeaveInterface, LeaveTypeInterface } from "@/types/leave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, CardBody, CardHeader, List, ListItem, Typography } from "@material-tailwind/react";
import moment from "moment";
import React, { useMemo } from "react";
import MemberThumbnail, { MemberSmallThumbnail } from "./MemberThumbnail";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import numeral from "numeral";
import LeaveSynthetic from "./LeaveSynthetic";
import LeaveThumbnail from "./LeaveThumbnail";
import BoardHeader from "./LeaveBoardHeader";

export default function LeaveBoard() {
  return (
    <div className="p-2 grid gap-2">
      <Card>
        <CardBody>
          <BoardHeader></BoardHeader>
          <List>
            {leaves.map((data) => (
              <LeaveThumbnail data={data} key={data.id} />
            ))}
          </List>
        </CardBody>
      </Card>
      <div className="grid grid-cols-2">
        <span></span>
        <LeaveSynthetic></LeaveSynthetic>
      </div>
    </div>
  );
}
