import React from "react";
import { List, ListItem } from "@material-tailwind/react";
import { useHistories, useLoadHistory } from "./hooks";
import moment from "moment";

export default function BuilderHistories() {
  const histories = useHistories();
  const loadHistory = useLoadHistory();

  return (
    <List>
      {histories.map((history, index) => (
        <ListItem key={index} onClick={() => loadHistory(history)}>
          {moment(history.at).format("YYYY-MM-DD HH:mm:ss")}
        </ListItem>
      ))}
    </List>
  );
}
