const first = require("./first");

it("Counts the amount of safe reports", () => {
  const textFile = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  const safeReportCount = first(textFile);

  expect(safeReportCount).toBe(2);
});
