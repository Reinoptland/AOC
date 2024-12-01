const second = require("./second");

it("Sum up the distances between similar numbers", () => {
  const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  const similartyScore = second(testInput);

  expect(similartyScore).toBe(31);
});
