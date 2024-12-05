const { readFileSync } = require("fs");
const { first } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const sumOfMiddlePagesOfValidUpdates = first(textFile);

console.log("sumOfMiddlePages", sumOfMiddlePagesOfValidUpdates);
