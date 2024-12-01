const first = require("./first");

it("Sum up the distances between similar numbers", () => {
  const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  const result = first(testInput);

  expect(result).toBe(11);
});
