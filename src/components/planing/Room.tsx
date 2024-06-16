"use client";

import useQueryParam from "@/hooks/useQueryParam";
import { faCheckCircle, faChevronRight, faCopy, faPlusCircle, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@material-tailwind/react";
import { useCopyToClipboard, useSearchParam } from "react-use";
import { useRecoilValue } from "recoil";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { roomAtom, useRoomCreator } from "./store/room";
import { useUser } from "./store/user";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { TUser } from "./store/type";

export default function Room() {
  const roomCreate = useRoomCreator();
  const [roomQuery, setRoomQuery] = useQueryParam("room");
  const [, setClipboard] = useCopyToClipboard();
  const [roomName, setRoomName] = useState<string>("");

  const room = useRecoilValue(roomAtom);
  const [user, setUser] = useUser();

  useEffect(() => {
    if (!user) setUser({ name: "Noname", id: uuidV4() });
  }, [user, setUser]);

  const handleChangeName = (name: string) => {
    if (!user) return;
    setUser({ ...user, name });
  };

  const handleCreateRoom = () => {
    const room = roomCreate(roomName);
    setRoomQuery(room.id);
    setClipboard(room.url);
  };
  const handleJoinServer = () => {};

  return (
    <>
      {user && <UserThumbnail user={user} />}
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-white p-4 w-[30em] rounded-lg">
          <div className="py-4">
            <h4 className=" text-xl text-red-500 text-center font-bold uppercase">Join in:</h4>
          </div>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Input readOnly label="Indentify" value={room?.id ?? roomQuery} />
              {roomQuery ? (
                <Input readOnly label="Room" value={room?.name}></Input>
              ) : (
                <Input
                  readOnly={!!room?.id}
                  label="Room"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value ?? "")}
                  icon={<FontAwesomeIcon className="cursor-pointer" icon={faPlusCircle} onClick={handleCreateRoom} />}
                ></Input>
              )}
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <Input
                label="Enter yourname"
                className="hi"
                value={user?.name ?? ""}
                onChange={(e) => handleChangeName(e.target.value ?? "")}
              ></Input>
            </div>
            <div className="flex justify-end">
              <Button disabled={!room?.id} className="px-4 flex flex-row gap-2 items-center justify-center">
                <span>Join room</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function UserThumbnail(props: { user: TUser }) {
  return (
    <div className="flex flex-row gap-2 p-2 items-center">
      <div className="flex flex-col">
        <span className="font-semibold">{props.user.name}</span>
      </div>
      <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
    </div>
  );
}
