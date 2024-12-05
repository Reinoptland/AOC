const { readFileSync } = require("fs");
const { first } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const location = first(textFile);

console.log(
  "What is the lowest location number that corresponds to any of the initial seed numbers",
  location
);