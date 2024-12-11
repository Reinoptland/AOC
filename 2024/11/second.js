const { transform, first } = require("./first");

function second(textFile) {
  let stones = textFile.split(" ").map((n) => parseInt(n));
  const generation1 = stones.map((stone) => transformTimes25(stone));
  const generation2 = generation1.map((series) =>
    series.map((stone) => transformTimes25(stone))
  );

  const generation3 = generation2.map((generation, index) => {
    return generation.map((series) => {
      return series
        .map((stone) => transformTimes25(stone).length)
        .reduce((acc, curr) => acc + curr);
    });
  });

  return generation3.reduce(
    (acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0),
    0
  );
}

const memo = {};

function transformTimes25(number) {
  if (memo[number]) return memo[number];
  const stones = first(`${number}`, 25);
  memo[number] = stones;
  return stones;
}

module.exports = { transformTimes25, second };
