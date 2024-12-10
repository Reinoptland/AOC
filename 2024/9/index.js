const { readFileSync } = require("fs");
const { first } = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

// const checksum = first(textFile);
const checksumDefragment = second(textFile);
// console.log("Checksum", checksum);
console.log("Checksum defragmented", checksumDefragment);
