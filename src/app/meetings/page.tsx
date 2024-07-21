"use client";

import MeetingApi from "@/components/meeting/state/MeetingApi";
import AsyncButton from "@/components/share/button/AsyncButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MeetingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    const meeting = await MeetingApi.create({ name: "Meeting room" });
    router.push(`/meetings/${meeting._id}`);
  };

  return (
    <div className="fluid flex items-center justify-center">
      <div className="w-[40em] h-40 bg-white rounded-lg flex flex-col items-center gap-4 justify-center">
        <h6 className="font-bold text-2xl text-red-500">Create your room</h6>
        <div className="grid grid-cols-1fr-auto gap-2">
          <Input value={title} label="Meeting room title" onChange={(e) => setTitle(e.target.value)} />
          <AsyncButton onClick={handleCreate} label="Create" icon={faPlus}></AsyncButton>
        </div>
      </div>
    </div>
  );
}
