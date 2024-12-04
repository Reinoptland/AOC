const { readFileSync } = require("fs");
const first = require("./first");
const second = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const sum = first(textFile);
const conditionalSum = second(textFile);

console.log("The sum of uncorrupted multiplications:", sum);
console.log(
  "The sum of uncorrupted multiplications with conditionals applied:",
  conditionalSum
);
