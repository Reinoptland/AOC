const { readFileSync } = require("fs");
const { first } = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const positionsVisited = first(textFile);
const obstacles = second(textFile);

console.log("Distinct positions visited", Object.keys(positionsVisited).length);
console.log("Obstacles count that can be safely placed", obstacles);
