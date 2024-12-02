const { second, isSafeReport, determineDirection } = require("./second");

describe("second", () => {
  test("Counts the amount of safe reports, while ignoring 1 unsafe value", () => {
    const textFile = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    const safeReportCount = second(textFile);

    expect(safeReportCount).toBe(4);
  });
});

describe("isSafeReport", () => {
  test("Should work with simple sequences", () => {
    expect(isSafeReport([1, 2, 3, 4])).toBe(true);
    expect(isSafeReport([4, 3, 2, 1])).toBe(true);
  });
  test("Reports are not safe if they in ascending order, with level difference bigger than 3 twice", () => {
    expect(isSafeReport([1, 5, 3, 4])).toBe(true);
    expect(isSafeReport([1, 5, 9, 10])).toBe(false);
  });

  test("Reports are not safe if they in descending order, with level difference bigger than 3 twice", () => {
    expect(isSafeReport([5, 1, 3, 2])).toBe(true);
    expect(isSafeReport([10, 6, 2, 1])).toBe(false);
  });

  test("Reports are not safe if they don't change levels twice", () => {
    expect(isSafeReport([1, 1, 2, 3])).toBe(true);
    expect(isSafeReport([1, 1, 1, 3])).toBe(false);
  });

  test("Reports are safe if the first difference is in the wrong direction", () => {
    expect(isSafeReport([3, 1, 2, 3, 4])).toBe(true);
    expect(isSafeReport([4, 5, 4, 3, 2])).toBe(true);
  });

  test("Reports are not safe if reverse their direction from ascending twice", () => {
    expect(isSafeReport([1, 2, 1, 3, 4])).toBe(true);
    expect(isSafeReport([1, 2, 1, 3, 2, 5])).toBe(false);
  });

  test("Reports are not safe if reverse their direction from descending twice", () => {
    expect(isSafeReport([4, 3, 4, 2, 1])).toBe(true);
    expect(isSafeReport([4, 3, 4, 2, 3, 1])).toBe(false);
  });

  test("Testcases with problem dampener", () => {
    expect(isSafeReport([7, 6, 4, 2, 1])).toBe(true);
    expect(isSafeReport([1, 2, 7, 8, 9])).toBe(false);
    expect(isSafeReport([9, 7, 6, 2, 1])).toBe(false);
    expect(isSafeReport([1, 3, 2, 4, 5])).toBe(true);
    expect(isSafeReport([8, 6, 4, 4, 1])).toBe(true);
    expect(isSafeReport([1, 3, 6, 7, 9])).toBe(true);
  });
});

describe("determineDirection", () => {
  test("Returns the direction of the sequence", () => {
    expect(determineDirection(1, 2, 3, 4)).toBe("ASCENDING");
    expect(determineDirection(4, 3, 2, 1)).toBe("DESCENDING");
  });
  test("Returns the direction of the sequence when one value is off", () => {
    expect(determineDirection(4, 2, 3, 4)).toBe("ASCENDING");
    expect(determineDirection(1, 8, 3, 4)).toBe("ASCENDING");
    expect(determineDirection(1, 3, 2, 1)).toBe("DESCENDING");
    expect(determineDirection(4, 0, 2, 1)).toBe("DESCENDING");
  });
  test("If the sequence as no direction, the direction is null", () => {
    expect(determineDirection(1, 1, 1, 1)).toBe(null);
    expect(determineDirection(8, 7, 9, 8)).toBe(null);
  });
  test("Test Cases", () => {
    expect(determineDirection(7, 6, 4, 2, 1)).toBe("DESCENDING");
    expect(determineDirection(1, 2, 7, 8, 9)).toBe(null);
    expect(determineDirection(9, 7, 6, 2, 1)).toBe("DESCENDING");
    expect(determineDirection(1, 3, 2, 4, 5)).toBe("ASCENDING");
    expect(determineDirection(8, 6, 4, 4, 1)).toBe("DESCENDING");
    expect(determineDirection(1, 3, 6, 7, 9)).toBe("ASCENDING");
  });
});
