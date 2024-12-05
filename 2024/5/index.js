const { readFileSync } = require("fs");
const { first } = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const sumOfMiddlePagesOfValidUpdates = first(textFile);
const sumOfMiddlePagesOfReorderedUpdates = second(textFile);

console.log(
  "Sum of middle pages of valid updates",
  sumOfMiddlePagesOfValidUpdates
);
console.log(
  "Sum of middle pages of reordered invalid updates",
  sumOfMiddlePagesOfReorderedUpdates
);
