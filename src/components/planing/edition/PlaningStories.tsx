import { Tab, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import clsx from "clsx";
import { Suspense, useEffect, useState } from "react";
import { TPlaning } from "@/types/plan";
import useQueryParam from "@/hooks/useQueryParam";
import Drawer from "@/components/share/Drawer";
import PlaningList from "./PlaningList";
import { useRefreshPlaningStories } from "./stories";
import PageLoader from "next/dist/client/page-loader";
import PageLoading from "@/components/share/PageLoading";
import EditionTask from "./EditionTask";

enum TTabs {
  Stories = "stories",
  Finished = "finished",
}

export default function PlaningStories(props: { planing: TPlaning }) {
  const [menu, setMenu] = useQueryParam<"open" | "close">("menu");
  const [activeTab, setActiveTab] = useState<TTabs>(TTabs.Stories);
  const refresh = useRefreshPlaningStories(props.planing._id);

  useEffect(() => {
    if (menu === "open") refresh();
  }, [menu]);

  return (
    <Drawer open={menu === "open"} onClose={() => setMenu("close")} className="h-full w-[60em] max-w-full shadow-lg">
      <div className={clsx(["w-full h-full relative]"])}>
        <Tabs value={activeTab} className="fluid grid grid-rows-[auto_1fr]">
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className: "bg-transparent border-b-2 border-red-500 shadow-none rounded-none",
            }}
          >
            <Tab
              value={TTabs.Stories}
              onClick={() => setActiveTab(TTabs.Stories)}
              className={clsx([activeTab === TTabs.Stories && "text-gray-900", "p-2 h-full"])}
            >
              <div className="flex flex-row items-center gap-2 ">
                <span className="font-semibold">Stories </span>
              </div>
            </Tab>
            <Tab
              value={TTabs.Finished}
              onClick={() => setActiveTab(TTabs.Finished)}
              className={clsx([activeTab === TTabs.Finished && "text-gray-900", "p-2"])}
            >
              <div className="flex flex-row items-center gap-2 ">
                <span className="font-semibold">Finished </span>
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody className="fluid">
            <Suspense fallback={<PageLoading />}>
              {TTabs.Stories === activeTab && <PlaningList planing={props.planing} />}
              {TTabs.Finished === activeTab && <div></div>}{" "}
            </Suspense>
          </TabsBody>
        </Tabs>
        <EditionTask />
      </div>
    </Drawer>
  );
}
