const { readFileSync } = require("fs");
const first = require("./first");
const { second } = require("./second");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const safeReports = first(textFile);
const safeReportsWithProblemDampener = second(textFile);

console.log("The amount of safe reports:", safeReports);
console.log(
  "The amount of safe reports with the dampener applied:",
  safeReportsWithProblemDampener
);
