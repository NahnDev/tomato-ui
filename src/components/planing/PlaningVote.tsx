import {
  faCheckCircle,
  faCircle,
  faClock,
  faForward,
  faPlay,
  faRightFromBracket,
  faUndo,
  faUserAltSlash,
  faUserAstronaut,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@material-tailwind/react";
import clsx from "clsx";
import InputWrapper from "../share/InputWrapper";
import { TStatus } from "./store/type";

export type TPlaningVoteProps = TVoteControlProps & {};

export default function PlaningVote(props: TPlaningVoteProps) {
  return (
    <div className="w-80 bg-white rounded-lg overflow-hidden">
      <VoteStatus />
      <VoteControl
        status={props.status}
        onFinish={props.onFinish}
        onReset={props.onReset}
        onSkip={props.onSkip}
        onStart={props.onStart}
      />
      <Timer />
      <div>
        <div className="p-2 flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center  text-slate-700 px-2">
            <FontAwesomeIcon icon={faUsers} />
            <span className="font-semibold">Members:</span>
          </div>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  );
}

function VoteStatus() {
  return <div className="p-4 bg-red-500 text-white">Waiting for moderator to finalise vote</div>;
}

export type TVoteControlProps = {
  status: TStatus;
  onReset: () => void;
  onStart: () => void;
  onSkip: () => void;
  onFinish: () => void;
};
function VoteControl(props: TVoteControlProps) {
  return (
    <div className="p-2 flex flex-col gap-2">
      {props.status === TStatus.Waiting && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="flex flex-row gap-2 items-center justify-center bg-slate-500"
            size="sm"
            onClick={props.onSkip}
          >
            <FontAwesomeIcon icon={faForward} />
            <span className="capitalize">Skip</span>
          </Button>
          <Button
            className="flex flex-row gap-2 items-center justify-center bg-blue-500"
            size="sm"
            onClick={props.onStart}
          >
            <FontAwesomeIcon icon={faPlay} />
            <span className="capitalize">Start vote</span>
          </Button>
        </div>
      )}
      {[TStatus.Voting, TStatus.Finished].includes(props.status) && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="flex flex-row gap-2 items-center justify-center bg-slate-500"
            size="sm"
            onClick={props.onReset}
          >
            <FontAwesomeIcon icon={faUndo} />
            <span className="capitalize">Retry</span>
          </Button>
          {props.status === TStatus.Finished ? (
            <Button
              className="flex flex-row gap-2 items-center justify-center bg-red-500"
              size="sm"
              onClick={props.onFinish}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className="capitalize">Finish</span>
            </Button>
          ) : (
            <Button
              className="flex flex-row gap-2 items-center justify-center bg-green-500"
              size="sm"
              onClick={props.onFinish}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              <span className="capitalize">Finish</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function Timer() {
  return (
    <div className="flex flex-row justify-between px-2">
      <div></div>
      <div className={clsx(["text-slate-900 p-2 text-lg", "flex flex-row items-center gap-2"])}>
        <FontAwesomeIcon className="text-base" icon={faClock} />
        <span>00:00:30</span>
      </div>
    </div>
  );
}

function UserCard() {
  return (
    <div className=" text-slate-900 rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-3xl" icon={faUserCircle} />
          <div className="px-2">
            <h3 className="text-lg ">Thanh Nhan</h3>
            <p className="text-xs text-slate-500">Voted at 00:23</p>
          </div>
        </div>
        <div className="text-slate-700 text-2xl">{Math.round(Math.random() * 5) + 1}</div>
      </div>
    </div>
  );
}
