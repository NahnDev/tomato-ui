import { useState } from "react";
import PlaningCard from "./PlaningCard";
import PlaningVote from "./PlaningVote";
import PlaningVoteSumarize from "./PlaningVoteSumarize";
import { useCurrentStory } from "./store/stories";
import { TStatus } from "./store/type";
import Container from "../share/Container";

export default function PlaningStory() {
  const [story] = useCurrentStory();
  const [status, setStatus] = useState<TStatus>(TStatus.Waiting);

  return (
    <div className="overflow-y-hidden grid grid-cols-[1fr_auto] h-full w-min mx-auto">
      <div className="w-[60vw]">
        <div className="p-8 text-center">
          <h4 className="text-center text-slate-900 text-2xl">{story?.title || "No story selected"}</h4>
        </div>
        <div>{story?.finished ? <PlaningVoteSumarize /> : <PlaningCard status={status} />}</div>
      </div>
      <PlaningVote
        status={status}
        onStart={() => setStatus(TStatus.Voting)}
        onReset={() => setStatus(TStatus.Waiting)}
        onFinish={() => setStatus(TStatus.Finished)}
        onSkip={() => setStatus(TStatus.Waiting)}
      />
    </div>
  );
}
