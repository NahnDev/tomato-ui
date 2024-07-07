export default function WaterWave() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute w-[300%] h-[300%] top-[40%] -left-full rounded-[45%] z-10 bg-blue-300 bg-opacity-25 animate-[spin_5s_linear_infinite]"></div>
      <div className="absolute w-[300%] h-[300%] top-[45%] -left-full rounded-[45%] z-10 bg-blue-400 bg-opacity-75 animate-[spin_5s_linear_infinite]"></div>
      <div className="absolute w-[300%] h-[300%] top-[50%] -left-full rounded-[45%] z-10 bg-blue-500  bg-opacity-100 animate-[spin_5s_linear_infinite]"></div>
    </div>
  );
}
