const { readFileSync } = require("fs");
const { first, findAntinodes } = require("./first");
const { findAntinodeLine } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const signalStrenghtOpposite = first(textFile, findAntinodes);
const signalStrenghtLine = first(textFile, findAntinodeLine);
console.log(
  "Unique count of opposite antinodes within bounds",
  signalStrenghtOpposite
);
console.log(
  "Unique count of lines of antinodes within bounds",
  signalStrenghtLine
);
