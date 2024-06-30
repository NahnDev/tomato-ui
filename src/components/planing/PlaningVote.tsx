import {
  faChevronCircleRight,
  faClock,
  faForward,
  faPlay,
  faRightFromBracket,
  faUndo,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { TUser } from "@/types/TUser";
import { StoryStatus, TPlaning, TStory } from "@/types/plan";
import { useMemo } from "react";
import { useCurrentStoryHandler } from "./store/story";
import useTimeCouter from "@/hooks/useTimeCouter";
import PlaningConstant from "@/constants/planing";
import numeral from "numeral";
import { useAuth } from "@/state/auth/hook";

export type TPlaningVoteProps = {
  planing: TPlaning;
  story: TStory;
};

export function useIsMaster(planing: TPlaning) {
  const { user } = useAuth();
  return planing.masters.map((master) => master._id).includes(user?._id ?? "");
}

export default function PlaningVote(props: TPlaningVoteProps) {
  const isMaster = useIsMaster(props.planing);
  const votes = useMemo(() => {
    const votes = props.story.votes ?? [];
    return props.planing.users.map((user) => {
      const voted = votes.find((story) => user._id === story.user);
      return {
        user,
        value: voted?.value,
        at: voted?.at,
      };
    });
  }, [props.story.votes, props.planing.users]);

  return (
    <div className="h-full px-4 pt-8 overflow-y-hidden w-[22em]">
      <div className="w-full bg-white rounded-lg overflow-hidden h-min max-h-full flex flex-col gap-2">
        <VoteStatus story={props.story} />
        {isMaster && <VoteControl story={props.story} />}
        <Timer start={props.story.startAt} />
        <div className="flex-1 flex flex-col gap-2 overflow-y-hidden">
          <div className="flex flex-row gap-2 items-center  text-slate-700 px-2">
            <FontAwesomeIcon icon={faUsers} />
            <span className="font-semibold">Members:</span>
          </div>
          <div className="h-full flex-1 overflow-y-auto">
            {votes.map((vote) => (
              <VoteCard key={vote.user._id} user={vote.user} value={vote.value} at={vote.at} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VoteStatus(props: { story: TStory }) {
  const isWaiting = useMemo(() => props.story.status === StoryStatus.WAITING, [props.story.status]);
  const isVoting = useMemo(() => props.story.status === StoryStatus.VOTING, [props.story.status]);
  const isFinished = useMemo(() => props.story.status === StoryStatus.FINISHED, [props.story.status]);
  const isSkipped = useMemo(() => props.story.status === StoryStatus.SKIPPED, [props.story.status]);

  return (
    <div className="p-4 bg-red-500 text-white">
      {isWaiting && "Waiting for voting to start"}
      {isVoting && "Waiting for all members to vote"}
      {isFinished && "Voting finished"}
      {isSkipped && "Story skipped"}
    </div>
  );
}

export type TVoteControlProps = { story: TStory };
function VoteControl(props: TVoteControlProps) {
  const isWaiting = useMemo(() => props.story.status === StoryStatus.WAITING, [props.story.status]);
  const isVoting = useMemo(() => props.story.status === StoryStatus.VOTING, [props.story.status]);
  const isFinished = useMemo(() => props.story.status === StoryStatus.FINISHED, [props.story.status]);
  const isSkipped = useMemo(() => props.story.status === StoryStatus.SKIPPED, [props.story.status]);

  const { skip, finish, reset, start, next } = useCurrentStoryHandler(props.story.planing);

  return (
    <div className="p-2 flex flex-col gap-2">
      {isWaiting && (
        <div className="grid grid-cols-2 gap-2">
          <Button className="flex flex-row gap-2 items-center justify-center bg-slate-500" size="sm" onClick={skip}>
            <FontAwesomeIcon icon={faForward} />
            <span className="capitalize">Skip</span>
          </Button>
          <Button className="flex flex-row gap-2 items-center justify-center bg-blue-500" size="sm" onClick={start}>
            <FontAwesomeIcon icon={faPlay} />
            <span className="capitalize">Start vote</span>
          </Button>
        </div>
      )}
      {isVoting && (
        <div className="grid grid-cols-2 gap-2">
          <Button className="flex flex-row gap-2 items-center justify-center bg-slate-500" size="sm" onClick={reset}>
            <FontAwesomeIcon icon={faUndo} />
            <span className="capitalize">Retry</span>
          </Button>
          <Button className="flex flex-row gap-2 items-center justify-center bg-red-500" size="sm" onClick={finish}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span className="capitalize">Finish</span>
          </Button>
        </div>
      )}
      {isFinished && (
        <div className="grid grid-cols-2 gap-2">
          <Button className="flex flex-row gap-2 items-center justify-center bg-slate-500" size="sm" onClick={reset}>
            <FontAwesomeIcon icon={faUndo} />
            <span className="capitalize">Retry</span>
          </Button>
          <Button className="flex flex-row gap-2 items-center justify-center bg-red-500" size="sm" onClick={next}>
            <FontAwesomeIcon icon={faChevronCircleRight} />
            <span className="capitalize">Next</span>
          </Button>
        </div>
      )}
      {isSkipped && (
        <div className="grid grid-cols-2 gap-2">
          <Button className="flex flex-row gap-2 items-center justify-center bg-slate-500" size="sm" onClick={reset}>
            <FontAwesomeIcon icon={faUndo} />
            <span className="capitalize">Retry</span>
          </Button>
          <Button className="flex flex-row gap-2 items-center justify-center bg-red-500" size="sm" onClick={next}>
            <FontAwesomeIcon icon={faChevronCircleRight} />
            <span className="capitalize">Next</span>
          </Button>
        </div>
      )}
    </div>
  );
}

function Timer(props: { start?: number }) {
  const format = useTimeCouter(PlaningConstant.Remaining, props.start);

  return (
    <div className="flex flex-row justify-between px-2">
      <div></div>
      <div className={clsx(["text-slate-900 p-2 text-lg", "flex flex-row items-center gap-2"])}>
        <FontAwesomeIcon className="text-base" icon={faClock} />
        <span>{format}</span>
      </div>
    </div>
  );
}

function VoteCard(props: { user: TUser; value?: number; at?: number }) {
  const votedAtStr = useMemo(() => numeral(PlaningConstant.Remaining - (props.at ?? 0)).format("00:00"), [props.at]);
  return (
    <div className=" text-slate-900 rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon className="text-3xl" icon={faUserCircle} />
          <div className="px-2">
            <h3 className="text-lg ">{props.user.name}</h3>
            <p className="text-xs text-slate-500">Voted at {votedAtStr}</p>
          </div>
        </div>
        {props?.value ? (
          <div className="text-slate-700 text-2xl">{props.value}</div>
        ) : (
          <div className="text-slate-700 text-2xl">?</div>
        )}
      </div>
    </div>
  );
}
