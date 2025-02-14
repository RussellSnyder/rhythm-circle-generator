import { generateBeatArrays } from "../utils/beat.utils";

const numberOfBeats = 5;

export const RhythmicCircleContainer = () => {
  const levels = generateBeatArrays(numberOfBeats);

  return (
    <div>
      {Object.entries(levels).map(([key, { patterns, compliments }]) => (
        <div key={`level-${key}`}>
          {key}

          {JSON.stringify(patterns)}
        </div>
      ))}
    </div>
  );
};
