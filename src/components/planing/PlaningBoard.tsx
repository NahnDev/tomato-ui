import PlaningHeader from "@/components/planing/PlaningHeader";
import PlaningStory from "./PlaningStory";
import { useCurrentPlaning } from "./store/planing";
import { Suspense, useMemo } from "react";
import { useAuth } from "@/state/auth/hook";
import PlaningStories from "./edition/PlaningStories";
import PlaningSocket from "./socket/PlaningSocket";
import PageLoading from "../share/PageLoading";
import { useRecoilValueLoadable } from "recoil";
import { storiesState } from "./edition/stories";

export default function PlaningBoard() {
  const { user } = useAuth();
  const planing = useCurrentPlaning();
  const isMaster = useMemo(() => planing.masters.map(({ _id }) => _id).includes(user?._id!), [user, planing]);

  return (
    <PlaningSocket planing={planing}>
      <div className="fluid grid grid-rows-[auto_1fr]">
        <PlaningHeader planing={planing} isMaster={isMaster} />
        <Suspense fallback={<PageLoading />}>
          <PlaningStory planing={planing} />
        </Suspense>
        {isMaster && <PlaningStories planing={planing} />}
      </div>
    </PlaningSocket>
  );
}
