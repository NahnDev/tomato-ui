export default function BoardHeader() {
  return (
    <div className="p-2">
      <div className="grid grid-cols-[1fr_2fr_4fr_1fr_1fr] p-2">
        <span className="font-semibold pl-2">Type</span>
        <span className="font-semibold pl-2">Date leave</span>
        <span className="font-semibold pl-2">Reason</span>
        <span className="font-semibold pl-2">Approve by</span>
        <span className="font-semibold pl-2">Quota</span>
      </div>
    </div>
  );
}
