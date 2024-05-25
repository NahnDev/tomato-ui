import { faFont, faCalendar, faPaste, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Typography, List, ListItem, ListItemPrefix, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import TemplateThumbnail from "./TemplateThumbnail";
import { faNode } from "@fortawesome/free-brands-svg-icons";
import TemplateCreator from "./TemplateCreator";
import { useBoolean } from "usehooks-ts";

export default function TemplateSidebar() {
  const { value: shown, setFalse: handleClose, setTrue: handleOpen } = useBoolean();
  return (
    <div className="p-1 h-full w-60">
      <Card className="h-full">
        <div className="p-4 py-2 flex flex-row justify-between items-center">
          <Typography variant="h6" color="blue-gray" className="text-sm">
            Templates
          </Typography>
          <IconButton variant="text" className="text-base rounded-full" onClick={handleOpen}>
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
          </IconButton>
        </div>

        <List>
          <TemplateThumbnail icon={faPaste} id="12" name="Events"></TemplateThumbnail>
          <TemplateThumbnail icon={faNode} id="13" name="Programmers"></TemplateThumbnail>
        </List>
      </Card>
      <TemplateCreator open={shown} onClose={handleClose} />
    </div>
  );
}
