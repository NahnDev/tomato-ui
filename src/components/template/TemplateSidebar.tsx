import { faFont, faCalendar, faPaste, faPlusCircle, fa1, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Breadcrumbs,
  Step,
  Stepper,
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
} from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import TemplateThumbnail from "./TemplateThumbnail";
import { faNode } from "@fortawesome/free-brands-svg-icons";
import TemplateCreator from "./TemplateCreator";
import { useBoolean } from "usehooks-ts";
import { useParams } from "next/navigation";
import clsx from "clsx";
import TemplateStepper from "./TemplateStepper";

export default function TemplateSidebar() {
  const { value: shown, setFalse: handleClose, setTrue: handleOpen } = useBoolean();

  return (
    <div className="p-1 h-full w-80">
      <Card className="h-full">
        <div className="p-4 py-2 flex flex-row justify-between items-center">
          <div className="flex-1 flex flex-row text-red-500 gap-2">
            <FontAwesomeIcon icon={faLayerGroup} />
            <h4 className="font-bold text-sm">Templates</h4>
          </div>
          <IconButton variant="text" className="text-base rounded-full" onClick={handleOpen}>
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
          </IconButton>
        </div>
        <TemplateList />
      </Card>
      <TemplateCreator open={shown} onClose={handleClose} />
    </div>
  );
}

function TemplateList() {
  return (
    <List>
      <TemplateThumbnail icon={faPaste} id="12" name="Events"></TemplateThumbnail>
      <TemplateThumbnail icon={faNode} id="13" name="Programmers"></TemplateThumbnail>
    </List>
  );
}
