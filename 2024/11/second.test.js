const { transformTimes25, second } = require("./second");

describe("transform 25 times", () => {
  test("should transform a number 25 times and memoize the result", () => {
    const number = "0";
    const stones = transformTimes25(number);
    expect(stones.length).toEqual(19778);
  });
});

describe("second", () => {
  test("should transform the input 75 times and return the amount of stones", () => {
    const number = "0";
    const stones = second(number);
    expect(stones).toEqual(22938365706844);
  });
});
