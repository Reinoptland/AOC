const { readFileSync } = require("fs");
const first = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const safeReports = first(textFile);

console.log("The amount of safe reports:", safeReports);
