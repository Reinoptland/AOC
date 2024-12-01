const { readFileSync } = require("fs");

const lines = readFileSync(`${__dirname}/input.txt`, "utf-8").split("\n");

console.clear();
// console.log(lines);

const GEAR = "*";
const numbers = {};
const gears = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  numbers[i] = {};

  for (let j = 0; j < line.length; j++) {
    const character = line[j];
    if (character === GEAR) {
      gears[`${i},${j}`] = true;
    }

    if (!isNaN(parseInt(character))) {
      const numberLength = line
        .slice(j)
        .split("")
        // add a dot at the end of the line, to prevent bugs with numbers at the end of a line
        .concat(".")
        .findIndex((char) => isNaN(parseInt(char)));

      const number = parseInt(line.slice(j, j + numberLength));
      for (let k = 0; k < numberLength; k++) {
        numbers[i][j + k] = number;
      }
      j += numberLength - 1;
    }
  }
}

let sum = 0;

for (const gear in gears) {
  let [x, y] = gear.split(",");
  x = parseInt(x);
  y = parseInt(y);
  const adjacentNumbers = new Set();
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (numbers[i][j]) {
        adjacentNumbers.add(numbers[i][j]);
      }
    }
  }

  if (adjacentNumbers.size === 2) {
    const [number1, number2] = [...adjacentNumbers];
    const ratio = number1 * number2;
    sum += ratio;
  }
}

console.log("SUM:", sum);
