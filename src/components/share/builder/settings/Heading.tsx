export default function Heading(props: { label: string }) {
  return (
    <div className="flex flex-row items-center -ml-2 pt-4 pb-2">
      <div className="w-2 h-[1px] bg-slate-200"></div>
      <div className="px-2 text-xs text-slate-900 font-semibold">{props.label}</div>
      <div className="flex-1 h-[1px] bg-slate-200"></div>
    </div>
  );
}
