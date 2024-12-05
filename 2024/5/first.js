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
    if (!lookup[pageBefore]) {
      lookup[pageBefore] = {
        pagesAfter: { [pageAfter]: true },
        pagesBefore: {},
      };
    } else {
      lookup[pageBefore].pagesAfter[pageAfter] = true;
    }

    if (!lookup[pageAfter]) {
      lookup[pageAfter] = {
        pagesAfter: {},
        pagesBefore: { [pageBefore]: true },
      };
    } else {
      lookup[pageAfter].pagesBefore[pageBefore] = true;
    }
  }
  return lookup;
}

function isValidUpdate(update, lookup) {
  let pagesProcessed = [];
  for (const page of update) {
    if (!lookup[page]) {
      pagesProcessed.push(page);
      continue;
    } else {
      for (const processedPage of pagesProcessed) {
        if (lookup[page].pagesAfter[processedPage]) return false;
      }
      pagesProcessed.push(page);
    }
  }

  return true;
}

module.exports = { first };
