const { readFileSync } = require("fs");
const { first } = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const infinityStones = first(textFile, 25);
console.log(
  "Number of infinity stones after 25 generations",
  infinityStones.length
);

console.time();
const infinityStones2 = second(textFile);
console.log("Number of infinity stones after 25 generations", infinityStones2);
console.timeEnd();
// 7 minutes 17 seconds 😓
