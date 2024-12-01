const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf-8").split("\n");

let sum = 0;
for (const game of lines) {
  const [_, data] = game.replace("Game ", "").split(": ");
  const minimumCubes = {
    green: 0,
    red: 0,
    blue: 0,
  };

  const subsets = data.split("; ").map((subset) => subset.split(", "));
  for (const subset of subsets) {
    for (const cubes of subset) {
      let [count, color] = cubes.split(" ");
      count = parseInt(count);

      if (minimumCubes[color] < count) {
        minimumCubes[color] = count;
      }
    }
  }

  sum += Object.values(minimumCubes).reduce((acc, curr) => acc * curr);
}

console.log("Sum of power of sets:", sum);
