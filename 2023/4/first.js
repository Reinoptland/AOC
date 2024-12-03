const { readFileSync } = require("fs");

const lines = readFileSync(`${__dirname}/input.txt`, "utf-8").split("\n");

const points = lines
  .map((line) => {
    let [winningNumbers, actualNumbers] = line.split(" | ");
    winningNumbers = winningNumbers.split(": ")[1].trim().split(/\s+/);
    actualNumbers = actualNumbers.trim().split(/\s+/);

    const lookup = {};

    for (const number of winningNumbers) {
      lookup[number] = 0;
    }

    let score = 0;
    for (const number of actualNumbers) {
      if (lookup.hasOwnProperty(number)) {
        score = score === 0 ? 1 : score * 2;
      }
    }

    return score;
  })
  .reduce((acc, curr) => acc + curr);

console.log("The elf has", points, "points");
