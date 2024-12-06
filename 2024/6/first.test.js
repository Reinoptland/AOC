const { first } = require("./first");

it("Maps the distinct positions visited by the guard", () => {
  const textFile = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

  const visited = first(textFile);
  expect(Object.keys(visited).length).toBe(41);
});
