import ReactRough, { Circle } from "react-rough";
import { CircleProps } from "react-rough/dist/RoughComponentProps";

export interface BeatProps extends CircleProps {
  isFilled: boolean;
}

export const Beat = ({ diameter, x, y, isFilled }: BeatProps) => {
  return (
    <ReactRough
      config={{
        options: {
          fill: isFilled ? "blue" : "none",
        },
      }}
      renderer="svg"
      height={300}
    >
      <Circle x={x} y={y} diameter={diameter} />
    </ReactRough>
  );
};
