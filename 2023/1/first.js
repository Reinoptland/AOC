const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", "utf8").split("\n");

const calibrationValue = lines
  .map((line) => {
    let first = null;
    let last = null;

    for (const char of line) {
      const number = parseInt(char);
      if (isNaN(number)) {
        continue;
      }

      if (first === null) {
        first = char;
      }

      last = char;
    }

    return Number([first, last].join(""));
  })
  .reduce((acc, curr) => acc + curr);

console.log("First calibration value", calibrationValue);
