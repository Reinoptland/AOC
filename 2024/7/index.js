const { readFileSync } = require("fs");
const { first, add, multiply, concatenate } = require("./first");

const textFile = readFileSync(`${__dirname}/input.txt`, "utf8");

const calibrationValueSumAddMultiply = first(textFile, [add, multiply]);
const calibrationValueSumAddMultiplyConcatenate = first(textFile, [
  add,
  multiply,
  concatenate,
]);
console.log(
  "Calibration value sum using add and multiply operators",
  calibrationValueSumAddMultiply
);
console.log(
  "Calibration value sum using add, multiply and concatenate operators",
  calibrationValueSumAddMultiplyConcatenate
);
