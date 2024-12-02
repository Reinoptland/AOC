function first(textFile) {
  const reports = textFile
    .split("\n")
    .map((line) => line.split(" ").map((character) => parseInt(character)));

  let unsafeReportCount = 0;

  for (const report of reports) {
    let direction = null;
    for (let index = 0; index < report.length - 1; index++) {
      const level = report[index];
      const nextLevel = report[index + 1];
      const difference = nextLevel - level;
      if (difference === 0) {
        // level not increasing or decreasing, so unsafe
        unsafeReportCount++;
        break;
      } else if (Math.abs(difference) > 3) {
        // level change to great, so unsafe
        unsafeReportCount++;
        break;
      } else if (difference > 0) {
        if (index === 0) {
          // first difference, so we note subsequent level should go up
          direction = "ASCENDING";
        } else if (direction === "DESCENDING") {
          // change in direction of levels, so unsafe
          unsafeReportCount++;
          break;
        }
      } else if (difference < 0) {
        if (index === 0) {
          // first difference, so we note subsequent level should go up
          direction = "DESCENDING";
        } else if (direction === "ASCENDING") {
          // change in direction of levels, so unsafe
          unsafeReportCount++;
          break;
        }
      }
    }
  }

  return reports.length - unsafeReportCount;
}

module.exports = first;
