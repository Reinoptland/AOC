const second = require("./second");

it("Parses valid multiplications and sums them conditionally", () => {
  const textFile = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

  const sum = second(textFile);

  expect(sum).toBe(48);
});
