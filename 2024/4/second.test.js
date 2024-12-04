const { second } = require("./second");

it("Counts occurences of X-MAS in the wordfinder puzzle", () => {
  const textFile = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

  const count = second(textFile);

  expect(count).toBe(9);
});
