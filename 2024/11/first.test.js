const { first, transform } = require("./first");

describe("first", () => {
  test("should return the count of stones after transforming the inifinity stones", () => {
    const textFile = "125 17";
    expect(first(textFile, 1)).toBe(3);
    expect(first(textFile, 2)).toBe(4);
    expect(first(textFile, 3)).toBe(5);
    expect(first(textFile, 4)).toBe(9);
    expect(first(textFile, 5)).toBe(13);
    expect(first(textFile, 6)).toBe(22);
    expect(first(textFile, 25)).toBe(55312);
  });
});

describe("transform", () => {
  test("should turn stones marked with 0 into 1", () => {
    const stone = 0;
    expect(transform(stone)).toBe(1);
  });
  test("should multiply stones with uneven digits by 2024", () => {
    const stone = 1;
    expect(transform(stone)).toBe(2024);
    const stone2 = 999;
    expect(transform(stone2)).toBe(2021976);
  });
  test("should split stones with an even number of digits in 2", () => {
    const stone = 10;
    expect(transform(stone)).toEqual([1, 0]);
    const stone2 = 99;
    expect(transform(stone2)).toEqual([9, 9]);
  });
  test("should ignore leading zeros when splitting a stone", () => {
    const stone = 1000;
    expect(transform(stone)).toEqual([10, 0]);
  });
});
