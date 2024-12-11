const { mapToRanges } = require("./first");

function second(textFile) {
  let { seeds, maps } = parseInput(textFile);

  let currentRanges = [...seeds];
  let nextRanges = [];
  for (let j = 0; j < maps.length; j++) {
    const map = maps[j];

    for (let index = 0; index < currentRanges.length; index++) {
      const range = currentRanges[index];
      const res = mapRange(range, map);
      nextRanges = nextRanges.concat(res);
    }
    currentRanges = nextRanges.sort((rangeA, rangeB) => rangeA[0] - rangeB[0]);
    nextRanges = [];
  }

  return currentRanges[0][0];
}

function parseInput(textFile) {
  let [seedsInputs, ...mapsInputs] = textFile.split("\n\n");
  const seeds = seedsInputs
    .split(": ")[1]
    .split(" ")
    .map((n) => parseInt(n));

  const seedRanges = [];
  for (let index = 0; index < seeds.length; index += 2) {
    seedRanges.push([seeds[index], seeds[index] + seeds[index + 1] - 1]);
  }
  seedRanges.sort((rangeA, rangeB) => rangeA[0] - rangeB[0]);

  const maps = mapsInputs.map((input) => {
    let [_, values] = input.split(" map:\n");

    return values
      .split("\n")
      .map((range) => {
        const [destination, sourceStart, rangeLength] = range
          .split(" ")
          .map((n) => parseInt(n));

        return [
          sourceStart,
          sourceStart + rangeLength - 1,
          destination - sourceStart,
        ];
      })
      .sort((rangeA, rangeB) => rangeA[0] - rangeB[0]);
  });

  return { seeds: seedRanges, maps };
}

function mapRange(range, map) {
  const [start, end] = range;

  // ---
  //   ***
  const overlapEnd = map.find((mapping) => {
    const [mappingStart, mappingEnd] = mapping;
    return start < mappingStart && end >= mappingStart;
  });

  //  --
  // ****
  const subset = map.find((mapping) => {
    const [mappingStart, mappingEnd] = mapping;
    return mappingStart <= start && mappingEnd >= end;
  });

  //  --
  // **
  const overlapStart = map.find((mapping) => {
    const [mappingStart, mappingEnd] = mapping;
    return start <= mappingEnd && mappingEnd < end;
  });

  if (overlapEnd) {
    const [mappingStart, mappingEnd] = overlapEnd;
    return mapRange([start, start + mappingStart - start - 1], map).concat(
      mapRange([mappingStart, end], map)
    );
  } else if (subset) {
    const [mappingStart, mappingEnd, offset] = subset;
    return [[start + offset, end + offset]];
  } else if (overlapStart) {
    const [mappingStart, mappingEnd] = overlapStart;
    return mapRange([start, mappingEnd], map).concat(
      mapRange([mappingEnd + 1, end], map)
    );
  } else {
    // No match found, do nothing
    return [range];
  }
}

module.exports = { second, parseInput, mapRange };
