const { first } = require("./first");
const { findAntinodeLine } = require("./second");

describe("first", () => {
  test("should count unique antinodes within the bounds of the map", () => {
    const textFile = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

    const antinodeCount = first(textFile, findAntinodeLine);
    expect(antinodeCount).toBe(34);
  });
});

describe("findAntinodeLine", () => {
  test.only("should find all antinodes in a line that are within bounds given 2 antennas", () => {
    const nodeA = "3,4";
    const nodeB = "5,5";
    const yBoundry = 9;
    const xBoundry = 9;

    const antiNodes = findAntinodeLine(nodeA, nodeB, yBoundry, xBoundry);

    expect(antiNodes).toStrictEqual(["1,3", "3,4", "5,5", "7,6", "9,7"]);
  });
});
