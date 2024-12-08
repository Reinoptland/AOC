const { readFileSync } = require("fs");
const { first } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const signalStrenght = first(textFile);
console.log("Unique count of antinodes within bounds", signalStrenght);
