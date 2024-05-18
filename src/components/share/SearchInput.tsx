import { Dialog, DialogHeader, Chip, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import InlineInput from "./InlineInput";

export default function SearchInput() {
  const [open, setOpen] = useState(false);
  useHotkeys("ctrl+k", (e) => {
    setOpen(true);
    e.stopPropagation();
    e.preventDefault();
  });
  return (
    <div className="relative py-1">
      <InlineInput readOnly placeholder="Ctrl+k" onFocus={() => setOpen(true)} />
      <Dialog open={open} handler={() => setOpen(!open)} className="focus:border-0">
        <DialogHeader>
          <div className="relative flex w-full">
            <InlineInput placeholder="Search" />
            <div className="absolute h-full right-0 flex justify-center align-middle p-2">
              <Chip value="esc" size="sm"></Chip>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get
          these plants, twenty five years of blood sweat and tears, and I&apos;m never giving up, I&apos;m just getting
          started. I&apos;m up to something. Fan luv.
        </DialogBody>
      </Dialog>
    </div>
  );
}
