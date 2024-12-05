function first(textFile) {
  const { rules, updates } = parseInput(textFile);
  const lookup = createLookup(rules);

  return updates
    .filter((update) => isValidUpdate(update, lookup))
    .map((array) => parseInt(array[Math.floor(array.length / 2)]))
    .reduce((acc, curr) => acc + curr);
}

function parseInput(textFile) {
  let [rules, updates] = textFile.split("\n\n");

  rules = rules.split("\n");
  updates = updates.split("\n").map((update) => update.split(","));
  return { rules, updates };
}

function createLookup(rules) {
  const lookup = {};
  for (const rule of rules) {
    const [pageBefore, pageAfter] = rule.split("|");
    lookup[pageBefore] ??= { pagesAfter: {} };
    lookup[pageBefore].pagesAfter[pageAfter] = true;
  }

  return lookup;
}

function isValidUpdate(update, lookup) {
  let pagesProcessed = [];
  for (const currentPage of update) {
    const pageSpecifiedInRules = lookup[currentPage];
    const pageIsInInvalidPosition =
      pageSpecifiedInRules &&
      pagesProcessed.some(
        (processedPage) => lookup[currentPage].pagesAfter[processedPage]
      );

    if (pageIsInInvalidPosition) return false;
    else {
      pagesProcessed.push(currentPage);
    }
  }

  return true;
}

module.exports = { first, parseInput, createLookup, isValidUpdate };
