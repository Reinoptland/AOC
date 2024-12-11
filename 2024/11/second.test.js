const { transformTimes25, second, transformGeneration } = require("./second");

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

describe("transformGeneration", () => {
  test("should transform a generation of stones when given an array", () => {
    const stones = [125, 17];
    const nextGeneration = transformGeneration(stones);

    expect(nextGeneration).toEqual({ 253000: 1, 1: 1, 7: 1 });
  });

  test("should transform a generation of stones when given an object", () => {
    const stones = { 253000: 1, 1: 1, 7: 1 };
    const nextGeneration = transformGeneration(stones);
    expect(nextGeneration).toEqual({ 253: 1, 0: 1, 2024: 1, 14168: 1 });
  });

  test("should transform a generation of stones that contain duplicates", () => {
    const stones = [1036288, 7, 2, 20, 24, 4048, 1, 4048, 8096, 28, 67, 60, 32];
    const nextGeneration = transformGeneration(stones);
    expect(nextGeneration).toEqual({
      0: 2,
      14168: 1,
      2: 4,
      2024: 1,
      2097446912: 1,
      3: 1,
      4: 1,
      40: 2,
      4048: 1,
      48: 2,
      6: 2,
      7: 1,
      8: 1,
      80: 1,
      96: 1,
    });
  });
});
