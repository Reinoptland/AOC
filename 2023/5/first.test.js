const { mapToRanges } = require("./first");

describe("Take source numbers and map them correct outputs through ranges", () => {
  test("Seeds to Soil", () => {
    const sourceNumbers = [79, 14, 55, 13];
    const ranges = [
      [50, 98, 2],
      [52, 50, 48],
    ];

    expect(mapToRanges(sourceNumbers, ranges)).toEqual([81, 14, 57, 13]);
  });

  test("Soil to Fertilizer", () => {
    const sourceNumbers = [81, 14, 57, 13];
    const ranges = [
      [0, 15, 37],
      [37, 52, 2],
      [39, 0, 15],
    ];

    expect(mapToRanges(sourceNumbers, ranges)).toEqual([81, 53, 57, 52]);
  });
});

// 0 -> 39
// ..
// 14 -> 53

// 15 -> 0
// 16 -> 1
// 17 -> 2
// 18 -> 3
// 19 -> 4
// 20 -> 5
// 21 -> 6
// ..
// 51 -> 36

// 52 -> 37
// 53 -> 38
