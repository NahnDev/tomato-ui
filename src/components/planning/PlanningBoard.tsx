import PlanningHeader from "@/components/planning/PlanningHeader";
import PlanningStory from "./PlanningStory";
import { useCurrentPlanning } from "./store/planning";
import { Suspense, useMemo } from "react";
import { useAuth } from "@/state/auth/hook";
import PlanningStories from "./edition/PlanningStories";
import PlanningSocket from "./socket/PlanningSocket";
import PageLoading from "../share/PageLoading";
import { useRecoilValueLoadable } from "recoil";
import { storiesState } from "./edition/stories";

export default function PlanningBoard() {
  const { user } = useAuth();
  const planning = useCurrentPlanning();
  const isMaster = useMemo(() => planning.masters.map(({ _id }) => _id).includes(user?._id!), [user, planning]);

  return (
    <PlanningSocket planning={planning}>
      <div className="fluid grid grid-rows-[auto_1fr]">
        <PlanningHeader planning={planning} isMaster={isMaster} />
        <Suspense fallback={<PageLoading />}>
          <PlanningStory planning={planning} />
        </Suspense>
        {isMaster && <PlanningStories planning={planning} />}
      </div>
    </PlanningSocket>
  );
}
