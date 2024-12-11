const { readFileSync } = require("fs");
const { first } = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const location = first(textFile);
const location2 = second(textFile);

console.log(
  "What is the lowest location number that corresponds to any of the initial seed numbers",
  location
);

console.log(
  "What is the lowest location number that corresponds to any seed in the range of seed",
  location2
);
