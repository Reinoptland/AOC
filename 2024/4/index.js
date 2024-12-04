const { readFileSync } = require("fs");
const { first } = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const countXMAS = first(textFile);
const countX_MAS = second(textFile);

console.log("XMAS count in wordfinder:", countXMAS);
console.log("X-MAS count in wordfinder", countX_MAS);
