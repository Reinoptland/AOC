const { first, findTrailheads, findSummits, getMoves } = require("./first");

describe("first should sum the score for all trailheads", () => {
  test("testcase 1", () => {
    const textFile = `0123
1234
8765
9876`;

    expect(first(textFile).score).toBe(1);
    expect(first(textFile).rating).toBe(16);
  });

  test("testcase 2", () => {
    const textFile = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

    expect(first(textFile).score).toBe(2);
  });

  test("testcase 3", () => {
    const textFile = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

    expect(first(textFile).score).toBe(4);
  });

  test("testcase 4", () => {
    const textFile = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;

    expect(first(textFile).score).toBe(3);
  });

  test("testcase 5", () => {
    const textFile = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

    expect(first(textFile).score).toBe(36);
  });
});

describe("findTrailheads", () => {
  test("should locate all trailheads in a map", () => {
    const map = `0..0
...0
0..0
..0.`.split("\n");

    expect(findTrailheads(map)).toEqual([
      [0, 0],
      [0, 3],
      [1, 3],
      [2, 0],
      [2, 3],
      [3, 2],
    ]);
  });
  test("should locate all trailheads in a map", () => {
    const map = `...0
....
....
....`.split("\n");

    expect(findTrailheads(map)).toEqual([[0, 3]]);
  });
});

describe("findSummits", () => {
  test("should calculate a score for a single trailhead given a map", () => {
    const map = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`.split("\n");
    expect(findSummits([0, 1], map)).toEqual(["5,3"]);
    expect(findSummits([6, 5], map)).toEqual(["0,4", "5,3"]);
  });
});

describe("getMoves", () => {
  test("should give an array of next moves given a location and a map", () => {
    const map = `111
102
1.1`.split("\n");

    expect(getMoves([1, 1], map)).toEqual([
      [0, 1],
      [1, 0],
    ]);
    expect(getMoves([2, 2], map)).toEqual([[1, 2]]);
    expect(getMoves([1, 2], map)).toEqual([]);
  });
});
