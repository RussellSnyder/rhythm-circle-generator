"use client";

import ReactRough, { Circle } from "react-rough";
import { Beat, BeatProps } from "./Beat";

const numberOfBeats = 5;
const beatCircleRadius = 20;

const radius = 50;
const size = radius * 2 + beatCircleRadius * 2 + 10;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BeatCircleData extends BeatProps {
  key: string;
}

export const RhythmicCircle = () => {
  const r = 50;
  const x = size / 2;
  const y = size / 2;
  // For a circle with origin (j, k) and radius r:
  const distanceBetweenBeats = (2 * Math.PI) / numberOfBeats;
  const offset = Math.PI / 2; // have the first beat at the top

  const beatCircleData: BeatCircleData[] = [...Array(numberOfBeats).keys()].map(
    (i) => {
      const t = i * distanceBetweenBeats - offset;
      const isFilled = i % 2 === 0;
      return {
        isFilled,
        x: r * Math.cos(t) + x,
        y: r * Math.sin(t) + y,
        diameter: beatCircleRadius * 2,
        key: `${t}`,
      };
    }
  );

  return (
    <ReactRough
      config={{
        options: {
          fill: "green",
        },
      }}
      renderer="svg"
      height={size}
      width={size}
    >
      <Circle x={x} y={y} diameter={r * 2} />
      {beatCircleData.map(({ key, ...beatCircleData }) => (
        <Beat key={key} {...beatCircleData} />
      ))}
    </ReactRough>
  );
};
