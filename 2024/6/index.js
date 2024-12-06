const { readFileSync } = require("fs");
const { first } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const positionsVisited = first(textFile);

console.log("Distinct positions visited", Object.keys(positionsVisited).length);
