import ReactRough, { Circle } from "react-rough";
import { CircleProps } from "react-rough/dist/RoughComponentProps";

export interface BeatProps extends CircleProps {
  isFilled: boolean;
}

export const Beat = ({ diameter, x, y, isFilled }: BeatProps) => {
  return (
    // @ts-expect-error not supporting typescript
    <ReactRough
      config={{
        options: {
          fill: isFilled ? "#ccaacc" : "none",
          fillShapeRoughnessGain: 0.5,
          fillStyle: "solid",
          fillWeight: 100,
          bowing: 6,
          stroke: "black",
          strokeWidth: 5,
        },
      }}
      renderer="svg"
      height={300}
    >
      <Circle x={x} y={y} diameter={diameter} />
    </ReactRough>
  );
};
