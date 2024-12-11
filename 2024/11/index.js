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
console.log("Number of infinity stones after 75 generations", infinityStones2);
console.timeEnd();
// First working solution for part 2    : 7 minutes 17 seconds 😓
// Current working solution for part 2  : 0.121 seconds 😌
