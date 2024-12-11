const { second, parseInput, mapRange } = require("./second");

describe("Second", () => {
  test("should find the lowest soil value given ranges of seeds and mappings", () => {
    const textFile = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

    expect(second(textFile)).toBe(46);
  });
});

describe("parseInput", () => {
  test("should convert the input textfile to a range of seeds and mappings", () => {
    const textFile = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
    expect(parseInput(textFile)).toStrictEqual({
      seeds: [
        [55, 67],
        [79, 92],
      ],
      maps: [
        [
          [50, 97, 2],
          [98, 99, -48],
        ],
        [
          [0, 14, 39],
          [15, 51, -15],
          [52, 53, -15],
        ],
        [
          [0, 6, 42],
          [7, 10, 50],
          [11, 52, -11],
          [53, 60, -4],
        ],
        [
          [18, 24, 70],
          [25, 94, -7],
        ],
        [
          [45, 63, 36],
          [64, 76, 4],
          [77, 99, -32],
        ],
        [
          [0, 68, 1],
          [69, 69, -69],
        ],
        [
          [56, 92, 4],
          [93, 96, -37],
        ],
      ],
    });
  });
});

describe("mapRange", () => {
  test("should subset", () => {
    const range = [55, 67];
    const map = [
      [50, 97, 2],
      [98, 99, -48],
    ];

    expect(mapRange(range, map)).toEqual([[57, 69]]);
  });
  test("should before any", () => {
    const range = [0, 5];
    const map = [
      [50, 97, 2],
      [98, 99, -48],
    ];

    expect(mapRange(range, map)).toEqual([[0, 5]]);
  });

  test("should after any", () => {
    const range = [100, 102];
    const map = [
      [50, 97, 2],
      [98, 99, -48],
    ];

    expect(mapRange(range, map)).toEqual([[100, 102]]);
  });
  test("should overlap start", () => {
    const range = [45, 55];
    const map = [
      [50, 97, 2],
      [98, 99, -48],
    ];

    expect(mapRange(range, map)).toEqual([
      [45, 49],
      [52, 57],
    ]);
  });
  test("should overlap ranges", () => {
    const range = [96, 99];
    const map = [
      [50, 97, 2],
      [98, 99, -48],
    ];

    expect(mapRange(range, map)).toEqual([
      [98, 99],
      [50, 51],
    ]);
  });
  test("should overlap end", () => {
    const range = [98, 105];
    const map = [
      [50, 97, 2],
      [98, 99, -48],
    ];

    expect(mapRange(range, map)).toEqual([
      [50, 51],
      [100, 105],
    ]);
  });
  test("should overlap start", () => {
    const range = [57, 69];
    const map = [
      [0, 6, 42],
      [7, 10, 50],
      [11, 52, -11],
      [53, 60, -4],
    ];

    expect(mapRange(range, map)).toEqual([
      [53, 56],
      [61, 69],
    ]);
  });
  test("should deal with ranges in between", () => {
    const range = [95, 103];
    const map = [
      [0, 55, 4],
      [120, 155, 2],
    ];

    expect(mapRange(range, map)).toEqual([[95, 103]]);
  });
});
