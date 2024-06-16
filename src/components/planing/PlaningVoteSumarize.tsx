import clsx from "clsx";
import numeral from "numeral";
import { useMemo } from "react";

// {value: number, count: number}[]
const seed = [
  { value: 1, count: 3 },
  { value: 2, count: 2 },
  { value: 3, count: 1 },
  { value: 5, count: 1 },
  { value: 8, count: 10 },
];

type TVoteResult = { value: number; count: number };

export default function PlaningVoteSumarize() {
  return (
    <div className="p-2 rounded-lg bg-white min-h-80 grid grid-cols-[1fr_auto] items-center">
      <VoteChar results={seed} />
      <VoteSumarize />
    </div>
  );
}

function VoteChar(props: { results: TVoteResult[] }) {
  const sum = useMemo(() => props.results.reduce((sum, { value }) => sum + value, 0), [props.results]);
  const percents = useMemo(() => props.results.map(({ count }) => count / sum), [props.results, sum]);
  const max = Math.max(...percents);

  return (
    <div className="p-2 rounded-lg bg-white min-h-80">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center text-slate-700 font-bold">
          <span className="pl-2 min-w-20 text-center">Est.</span>
          <span>Vote</span>
        </div>
        {props.results.map(({ value, count }, index) => {
          const percent = numeral(count / sum).format("0.00%");
          return (
            <div key={value}>
              <div className="flex flex-row items-center">
                <h6 className="text-center min-w-20 text-slate-500">{value}</h6>
                <div className="relative w-full">
                  <div
                    className={clsx([
                      "flex justify-end items-center px-2",
                      "h-10 overflow-hidden rounded-sm",
                      index === 0 ? "bg-red-500" : "bg-slate-500",
                    ])}
                    style={{ width: numeral(percents[index] / max).format("0.00%") }}
                  >
                    <span className="opacity-50 text-xs">{percent}</span>
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

function VoteSumarize() {
  return (
    <div className="p-20">
      <div className="size-[15em] rounded-full ring-4 text-red-500">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="text-center font-bold text-slate-500">Est.</span>
          <span className="text-center font-bold text-red-500 text-5xl">2</span>
          <div className="grid grid-cols-2 gap-10 text-slate-500 text-xs uppercase">
            <span>23 voted</span>
            <span>Avg: 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
