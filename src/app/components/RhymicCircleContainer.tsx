import {
  calculateTotalNumberOfPatterns,
  generateBeatArrays,
} from "../utils/beat.utils";
import { RhythmicCircle } from "./RhythmicCircle";

interface RhythmicCircleContainerProps {
  numberOfBeats: number;
}

export const RhythmicCircleContainer = ({
  numberOfBeats,
}: RhythmicCircleContainerProps) => {
  const levels = generateBeatArrays(numberOfBeats);

  return (
    <div>
      <header>
        <h3 className="text-xl mb-8 text-center">
          Total Patterns: {calculateTotalNumberOfPatterns(levels)}
        </h3>
        <div className="grid grid-cols-2 text-center mb-4">
          <h3 className="text-3xl">Pattern</h3>
          <h3 className="text-3xl">Compliment</h3>
        </div>
      </header>
      {Object.entries(levels).map(([key, { patterns, compliments }]) => (
        <div className="grid grid-cols-2 gap-8 mb-8" key={`level-${key}`}>
          <div className="flex flex-wrap justify-end">
            {patterns.map((pattern: number[]) => (
              <div className="" key={pattern.join("")}>
                <RhythmicCircle pattern={pattern} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-start">
            {compliments.map((pattern: number[]) => (
              <div className="" key={pattern.join("")}>
                <RhythmicCircle pattern={pattern} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
