const { first, findAntinodes } = require("./first");

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

    const antinodeCount = first(textFile);
    expect(antinodeCount).toBe(14);
  });
});

describe("findAntinode", () => {
  test("should find 2 antinodes when given 2 nodes", () => {
    const nodeA = "3,4";
    const nodeB = "5,5";
    const yBoundry = 9;
    const xBoundry = 9;

    const antiNodes = findAntinodes(nodeA, nodeB, yBoundry, xBoundry);

    expect(antiNodes).toStrictEqual(["1,3", "7,6"]);
  });
  test("should find 1 antinodes when given 2 nodes that create 1 antinode out of bounds", () => {
    const nodeA = "3,4";
    const nodeB = "5,5";
    const yBoundry = 6;
    const xBoundry = 9;

    const antiNodes = findAntinodes(nodeA, nodeB, yBoundry, xBoundry);

    expect(antiNodes).toStrictEqual(["1,3"]);
  });
});
