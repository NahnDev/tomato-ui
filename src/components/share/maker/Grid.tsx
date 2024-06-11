import { Line } from "react-konva";

export default function Grid(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  layerWidth: number;
  layerHeight: number;
}) {
  const x1 = props.x;
  const x2 = props.x + props.width;
  const y1 = props.y;
  const y2 = props.y + props.height;
  const wSlide = props.width / 3;
  const hSlide = props.height / 3;
  return (
    <>
      <Line points={[x1, 0, x1, props.layerHeight]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[x2, 0, x2, props.layerHeight]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[0, y1, props.layerWidth, y1]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[0, y2, props.layerWidth, y2]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[x1 + wSlide, y1, x1 + wSlide, y2]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[x1 + wSlide * 2, y1, x1 + wSlide * 2, y2]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[x1, y1 + hSlide, x2, y1 + hSlide]} stroke="#ffffff" strokeWidth={2}></Line>
      <Line points={[x1, y1 + hSlide * 2, x2, y1 + hSlide * 2]} stroke="#ffffff" strokeWidth={2}></Line>
    </>
  );
}
