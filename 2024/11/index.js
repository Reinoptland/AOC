const { readFileSync } = require("fs");
const { first } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const infinityStonesCount = first(textFile, 25);
console.log(
  "Number of infinity stones after 25 generations",
  infinityStonesCount
);
