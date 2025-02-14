"use client";

import ReactRough, { Circle } from "react-rough";
import {
  beatCircleOffset,
  beatCircleRadius,
  rhythmicCircleContainer,
  rhythmicCircleRadius,
} from "../constants";
import { Beat, BeatProps } from "./Beat";

interface BeatCircleData extends BeatProps {
  key: string;
}

interface RhythmicCirclProps {
  pattern: number[];
}

export const RhythmicCircle = ({ pattern }: RhythmicCirclProps) => {
  const numberOfBeats = pattern.length;
  const x = rhythmicCircleContainer / 2;
  const y = rhythmicCircleContainer / 2;
  // For a circle with origin (j, k) and radius r:
  const distanceBetweenBeats = (2 * Math.PI) / numberOfBeats;
  const offset = Math.PI / 2; // have the first beat at the top

  const beatCircleData: BeatCircleData[] = pattern.map((isFilled, i) => {
    const t = i * distanceBetweenBeats - offset;
    return {
      isFilled: Boolean(isFilled),
      x: (rhythmicCircleRadius + beatCircleOffset) * Math.cos(t) + x,
      y: (rhythmicCircleRadius + beatCircleOffset) * Math.sin(t) + y,
      diameter: beatCircleRadius * 2,
      key: `${t}`,
    };
  });

  return (
    <ReactRough
      config={{
        options: {
          fill: "#438d80",
          bowing: 6,
          fillStyle: "zigzag",
          fillWeight: 1.5,
        },
      }}
      renderer="svg"
      height={rhythmicCircleContainer}
      width={rhythmicCircleContainer}
    >
      <Circle x={x} y={y} diameter={rhythmicCircleRadius * 2} />
      {beatCircleData.map(({ key, ...beatCircleData }) => (
        <Beat key={key} {...beatCircleData} />
      ))}
    </ReactRough>
  );
};
