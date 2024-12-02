function second(textFile) {
  return textFile
    .split("\n")
    .map((line) => line.split(" ").map((character) => parseInt(character)))
    .filter((report) => isSafeReport(report)).length;
}

const ASCENDING = "ASCENDING";
const DESCENDING = "DESCENDING";

function audit(report, problemDampenerUsed = false) {
  // in order to satisfy the problem dampener we work with examining 3 values at a time
  // if we find an unsafe level we can easily eliminate one value and try again
  const [one, two, three, ...remainingLevels] = report;
  const delta1 = two - one;
  const delta2 = three - two;

  // edgecase:
  // through eliminating 1 value, we might be left with just two values at the end instead of 3
  // if the distance between them is correct, then this report is valid
  if (!three && delta1 <= 3 && delta1 > 0) {
    return true;
  }

  const levelsHaveSafeDistance = [delta1, delta2].every(
    (delta) => delta <= 3 && delta > 0
  );

  if (levelsHaveSafeDistance && remainingLevels.length === 0) {
    return true;
  } else if (levelsHaveSafeDistance) {
    return audit([two, three, ...remainingLevels], problemDampenerUsed);
  } else if (levelsHaveSafeDistance === false && problemDampenerUsed) {
    return false;
  } else {
    // in this case we have to eliminate a value and try again
    // there are three ways of doing so, if one of them works, the report is still valid
    // note: we only do this once, hence we keep track of wether we have done so with
    // problemDampenerUsed -> true
    return (
      audit([one, three, ...remainingLevels], true) ||
      audit([two, three, ...remainingLevels], true) ||
      audit([one, two, ...remainingLevels], true)
    );
  }
}

function isSafeReport(report) {
  const [level1, level2, level3, level4, ...remainingLevels] = report;
  const direction = determineDirection(level1, level2, level3, level4);
  return audit(direction === "ASCENDING" ? report : report.reverse());
}

function determineDirection(level1, level2, level3, level4) {
  // This function determines which direction the report is going: ascending or descending
  // Due to the problem dampener, we need 4 values
  // 3 to establish the direction while the 4 gives up an option to eliminate a value
  const permutations = [
    [level1, level2, level3], // value 4 eliminated
    [level2, level3, level4], // value 1 eliminated
    [level1, level3, level4], // value 2 eliminated
    [level1, level2, level4], // value 3 eliminated
  ].map(([one, two, three]) => {
    const delta1 = two - one;
    const delta2 = three - two;

    const magnitudeCorrect = [delta1, delta2].every(
      (delta) => Math.abs(delta) <= 3 && delta !== 0
    );
    const ascending = [delta1, delta2].every((delta) => delta > 0);
    const descending = [delta1, delta2].every((delta) => delta < 0);

    if (!magnitudeCorrect || !(ascending || descending)) {
      return {
        safe: false,
        direction: null,
      };
    } else {
      return {
        safe: true,
        direction: ascending ? ASCENDING : DESCENDING,
      };
    }
  });

  return (
    permutations.find((permutation) => permutation.safe)?.direction || null
  );
}

module.exports = { second, isSafeReport, determineDirection };
