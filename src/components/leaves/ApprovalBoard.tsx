import { leaves } from "@/seed/leave";
import { Button, ButtonGroup, Card, CardBody, ListItem } from "@material-tailwind/react";
import React from "react";
import ApprovalThumbnail from "./ApprovalThumbnail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export default function ApprovalBoard() {
  return (
    <div className="p-2 grid gap-2">
      <Card>
        <CardBody>
          {leaves.map((leave) => (
            <ListItem key={leave.id}>
              <ApprovalThumbnail data={leave}></ApprovalThumbnail>
              <div className="flex flex-row gap-2">
                <Button size="sm" color="red" className="flex flex-row items-center gap-2">
                  <FontAwesomeIcon icon={faXmarkCircle} />
                  <span>Cancel</span>
                </Button>
                <Button size="sm" color="green" className="flex flex-row items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>Approval</span>
                </Button>
              </div>
            </ListItem>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
