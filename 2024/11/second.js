const { transform, first } = require("./first");

function second(textFile) {
  let stones = textFile.split(" ").map((n) => parseInt(n));
  for (let index = 0; index < 75; index++) {
    stones = transformGeneration(stones);
  }
  return Object.entries(stones).reduce((acc, [_, count]) => {
    return acc + count;
  }, 0);
}

const memo = {};

function transformTimes25(number) {
  if (memo[number]) return memo[number];
  const stones = first(`${number}`, 25);
  memo[number] = stones;
  return stones;
}

function transformGeneration(stones) {
  if (Array.isArray(stones)) {
    const stoneMap = {};
    for (const stone of stones) {
      stoneMap[stone] ??= 0;
      stoneMap[stone]++;
    }
    stones = stoneMap;
  }

  const nextGeneration = {};
  const memoized = {};
  for (const [stone, count] of Object.entries(stones)) {
    const transformedStone = transform(stone);
    if (typeof transformedStone === "number") {
      nextGeneration[transformedStone] ??= 0;
      nextGeneration[transformedStone] += count;
    } else {
      for (const halvedStone of transformedStone) {
        nextGeneration[halvedStone] ??= 0;
        nextGeneration[halvedStone] += count;
      }
    }
  }
  return nextGeneration;
}

module.exports = { transformTimes25, second, transformGeneration };
