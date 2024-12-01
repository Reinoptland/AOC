const { readFileSync } = require("fs");
const first = require("./first");
const second = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const difference = first(textFile);
const similarity = second(textFile);

console.log("Difference is:", difference);
console.log("The similarityScore is:", similarity);
