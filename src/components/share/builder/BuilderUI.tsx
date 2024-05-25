import { GROUPS } from "@/constants/control";
import { Card, CardBody, List, ListItem, Typography } from "@material-tailwind/react";
import { Caladea } from "next/font/google";
import React from "react";
import ControlThumbnail from "./ControlThumbnail";

export default function BuilderUI() {
  return (
    <Card className="">
      <CardBody className="p-2">
        {GROUPS.map((group, index) => {
          return (
            <div key={index} className="flex flex-col py-2">
              <Typography className="w-full font-semibold p-2">{group.label}</Typography>
              <div className="grid grid-cols-2 gap-2">
                {group.types.map((type) => (
                  <ControlThumbnail key={type} type={type} />
                ))}
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
