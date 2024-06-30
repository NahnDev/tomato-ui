import { TStory } from "@/types/plan";
import clsx from "clsx";
import { sortBy } from "lodash";
import numeral, { validate } from "numeral";
import { useMemo } from "react";

type TVoteResult = { value: number; count: number };

export type TPlaningVoteSumarizeProps = { story: TStory };

export default function PlaningVoteSumarize(props: TPlaningVoteSumarizeProps) {
  const votes = useMemo(() => {
    const records = (props.story.votes ?? []).reduce((acc, vote) => {
      return { ...acc, [vote.value]: acc[vote.value] ? acc[vote.value] + 1 : 1 };
    }, {} as Record<number, number>);
    return Object.keys(records).map((value) => ({ value: Number(value), count: records[Number(value)] }));
  }, [props.story.votes]);
  return (
    <div className="p-2 rounded-lg bg-white min-h-80 grid grid-cols-[1fr_auto] items-center">
      <VoteChar results={votes} />
      <VoteSumarize results={votes} />
    </div>
  );
}

function VoteChar(props: { results: TVoteResult[] }) {
  const sum = useMemo(() => props.results.reduce((sum, { count }) => sum + count, 0), [props.results]);
  const percents = useMemo(() => props.results.map(({ count }) => count / sum), [props.results, sum]);
  const max = Math.max(...percents);
  const arr = useMemo(() => sortBy(props.results, "count"), [props.results]);

  return (
    <div className="p-2 rounded-lg bg-white min-h-80">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center text-slate-700 font-bold">
          <span className="pl-2 min-w-20 text-center">Est.</span>
          <span>Vote</span>
        </div>
        {arr.map(({ value, count }, index) => {
          const percent = numeral(count / sum).format("0.00%");
          return (
            <div key={value}>
              <div className="flex flex-row items-center">
                <h6 className="text-center min-w-20 text-slate-900 font-bold">{value}</h6>
                <div className="relative w-full">
                  <div
                    className={clsx([
                      "flex justify-end items-center px-2",
                      "h-10 overflow-hidden rounded-sm text-white",
                      index === 0 ? "bg-red-500" : "bg-slate-500",
                    ])}
                    style={{ width: numeral(percents[index] / max).format("0.00%") }}
                  >
                    <span className="opacity-100 text-xs">{percent}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VoteSumarize(props: { results: TVoteResult[] }) {
  const max = Math.max(...props.results.map(({ count }) => count));
  const mod = props.results.find(({ count }) => count === max)?.value ?? 0;
  const count = props.results.reduce((sum, { count }) => sum + count, 0);
  const avg = props.results.reduce((sum, { value, count }) => sum + value * count, 0) / count;
  return (
    <div className="p-20">
      <div className="size-[15em] rounded-full ring-4 text-red-500">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="text-center font-bold text-slate-500">Est.</span>
          <span className="text-center font-bold text-red-500 text-5xl">{mod}</span>
          <div className="grid grid-cols-2 gap-10 text-slate-500 text-xs uppercase">
            <span>{count} voted</span>
            <span>Avg: {avg}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
