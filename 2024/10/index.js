const { readFileSync } = require("fs");
const { first } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const { score, rating } = first(textFile);
console.log("Combined score of all trailheads", score);
console.log("Combined rating of all trailheads", rating);
