function tabulateNumbers(list) {
  const table = {};
  for (const number of list) {
    if (!table[number]) {
      table[number] = 1;
    } else {
      table[number]++;
    }
  }
  return table;
}

function second(textFile) {
  const lines = textFile.split("\n");

  const leftList = [];
  const rightList = [];

  for (const line of lines) {
    const [leftNumber, rightNumber] = line.split("   ");
    leftList.push(parseInt(leftNumber));
    rightList.push(parseInt(rightNumber));
  }

  const numberOccurancesLeftList = tabulateNumbers(leftList);
  const numberOccurancesRightList = tabulateNumbers(rightList);

  const numbersOccurringAtLeastOnce = new Set([
    ...Object.keys(numberOccurancesLeftList),
    ...Object.keys(numberOccurancesRightList),
  ]);

  let similarityScore = 0;
  for (const number of numbersOccurringAtLeastOnce) {
    const occurancesLeft = numberOccurancesLeftList[number];
    const occurancesRight = numberOccurancesRightList[number];
    if (occurancesLeft && occurancesRight) {
      similarityScore += number * (occurancesLeft * occurancesRight);
    }
  }

  return similarityScore;
}

module.exports = second;
