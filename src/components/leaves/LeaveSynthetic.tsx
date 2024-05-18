import { Card, CardBody, Typography, List, ListItem } from "@material-tailwind/react";

export default function LeaveSynthetic() {
  return (
    <Card>
      <CardBody>
        <Typography className=" text-red-500 font-semibold">Synthetic</Typography>
        <List>
          <ListItem className="flex flex-row justify-between py-2">
            <Typography className="font-bold">Rest (year n-1):</Typography>
            <Typography>7.5</Typography>
          </ListItem>
          <ListItem className="flex flex-row justify-between py-2">
            <Typography className="font-bold">Total used:</Typography>
            <Typography>8.5</Typography>
          </ListItem>
          <ListItem className="flex flex-row justify-between py-2">
            <Typography className="font-bold">Quota (year n):</Typography>
            <Typography>15</Typography>
          </ListItem>
          <ListItem className="flex flex-row justify-between py-2">
            <Typography className="font-bold">Rest (year n):</Typography>
            <Typography>14</Typography>
          </ListItem>
        </List>
      </CardBody>
    </Card>
  );
}
