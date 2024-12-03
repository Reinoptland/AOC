const { readFileSync } = require("fs");
const first = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const sum = first(textFile);

console.log("The sum of uncorrupted multiplications:", sum);
