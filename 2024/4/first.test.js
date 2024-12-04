const { first, convertToLines } = require("./first");

it("Counts occurences of XMAS in the wordfinder puzzle", () => {
  const textFile = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  const count = first(textFile);

  expect(count).toBe(18);
});

describe("convertToLines", () => {
  test("Converts the wordfinder puzzle to horizontal, vertical, diagonal lines and their", () => {
    const textFile = `MMMS
MSAM
AMXS
MSAM`;

    const lines = convertToLines(textFile);

    expect(lines).toStrictEqual([
      "MMMS",
      "MSAM",
      "AMXS",
      "MSAM",
      "MMAM",
      "MSMS",
      "MAXA",
      "SMSM",
      "M",
      "AS",
      "MMA",
      "MSXM",
      "MAS",
      "MM",
      "S",
      "M",
      "SA",
      "MXS",
      "SAMM",
      "MSA",
      "MM",
      "M",
    ]);
  });
});
