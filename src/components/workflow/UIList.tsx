"use client";

import {
  faA,
  faAdd,
  faCalendar,
  faFont,
  faGraduationCap,
  faPlane,
  faPlusCircle,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, IconButton, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";

export function UIList() {
  return (
    <div className="p-2 h-full">
      <Card className="h-full">
        <div className="p-4 pb-0">
          <Typography variant="h6" color="blue-gray">
            Template
          </Typography>
          <IconButton>
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
          </IconButton>
        </div>

        <List>
          <ListItem>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faFont}></FontAwesomeIcon>
            </ListItemPrefix>
            <span className="select-none">Short text</span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faFont}></FontAwesomeIcon>
            </ListItemPrefix>
            <span className="select-none">Long text</span>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
            </ListItemPrefix>
            <span className="select-none">Date</span>
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
