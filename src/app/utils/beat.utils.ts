import G from "generatorics";

interface DensityMap {
  [key: number]: {
    patterns: number[][];
    compliments: number[][];
  };
}

export const calculateTotalNumberOfPatterns = (
  densityMap: DensityMap
): number => {
  const patterns = Object.values(densityMap)
    .map(({ patterns, compliments }) => [...patterns, ...compliments])
    .flat();
  return patterns.length;
};

export const generateBeatArrays = (numberOfBeats: number): DensityMap => {
  // example
  // {
  //     1: {
  //         left: [[1,0,0,0,0], [0,1,0,0,0], [0,0,1,0,0]],
  //         right: [[0,1,1,1,1], [1,0,1,1,1]] <- complimentary
  //     }
  // }
  const densityMap: DensityMap = {};

  // because 1,0,0,0 (density 1) has the compliment of 0,1,1,1 (density 3)
  // we only need to go half way up number of beats to get all combos
  const isEven = numberOfBeats % 2 === 0;
  const maxDensity = isEven
    ? numberOfBeats / 2 + 1
    : Math.round(numberOfBeats / 2);

  const densityArray = new Array(maxDensity);
  [...densityArray.keys()].forEach((density) => {
    const patternsForLevel = generatePatternsForDensity(numberOfBeats, density);
    densityMap[density] = patternsForLevel;
    // [1,0,0,0,0] compliment is [0,1,1,1,1]
  });

  return densityMap;
};

const generateArray = (length: number, fill: number) => {
  return Array.from(Array(length).keys()).fill(fill);
};

export const generateCompliment = (array: number[]): number[] => {
  return array.map((entry) => (entry + 1) % 2);
};

export const generatePatternsForDensity = (
  numberOfBeats: number,
  density: number
) => {
  const rhythmWithDensityLeft = generateArray(numberOfBeats, 0);
  for (let d = 0; d < density; d++) {
    rhythmWithDensityLeft[d] = 1;
  }

  const patternSet = new Set<string>();
  const complimentSet = new Set<string>();

  for (const perm of G.permutation(rhythmWithDensityLeft)) {
    const complimentString = generateCompliment(perm).join("");
    const permString = perm.join("");
    if (!complimentSet.has(permString)) {
      patternSet.add(permString);
    }
    if (!patternSet.has(complimentString)) {
      complimentSet.add(complimentString);
    }
  }
  const patterns = Array.from(patternSet).map((perm) =>
    perm.split("").map(Number)
  );
  const compliments = Array.from(complimentSet).map((perm) =>
    perm.split("").map(Number)
  );

  return { patterns, compliments };
};
