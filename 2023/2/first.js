const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf-8").split("\n");

const MAX_CUBES = {
  red: 12,
  green: 13,
  blue: 14,
};

let total = 0;
for (const game of lines) {
  const [id, data] = game.replace("Game ", "").split(": ");
  let gameValid = true;
  const subsets = data.split("; ").map((subset) => subset.split(", "));
  for (const subset of subsets) {
    for (const cubes of subset) {
      const [count, color] = cubes.split(" ");
      if (MAX_CUBES[color] < count) {
        gameValid = false;
      }
    }
  }

  if (gameValid) {
    total += parseInt(id);
  }
}

console.log("Valid games sum:", total);
