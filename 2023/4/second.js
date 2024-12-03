const { readFileSync } = require("fs");

const lines = readFileSync(`${__dirname}/input.txt`, "utf-8").split("\n");

const scores = lines
  .map((line) => {
    console.log(line);
    let [cardId, numbers] = line.split(": ");
    console.log(cardId);
    cardId = cardId.split(/\s+/)[1];
    console.log(cardId);
    let [winningNumbers, actualNumbers] = numbers.split(" | ");
    winningNumbers = winningNumbers.trim().split(/\s+/);
    actualNumbers = actualNumbers.trim().split(/\s+/);

    const lookup = {};

    for (const number of winningNumbers) {
      lookup[number] = 0;
    }

    let matches = 0;
    for (const number of actualNumbers) {
      if (lookup.hasOwnProperty(number)) {
        matches++;
      }
    }

    return [cardId, matches];
  })
  .reduce((acc, [cardId, matches]) => {
    acc[cardId] = { matches: matches, copyCount: 1 };
    return acc;
  }, {});

for (let [id, { matches, copyCount }] of Object.entries(scores)) {
  console.log(scores);
  id = parseInt(id);
  if (matches === 0) continue;

  for (let index = id + 1; index < id + 1 + matches; index++) {
    scores[index].copyCount += copyCount;
  }
}

let sum = 0;
for (let [_, { __, copyCount }] of Object.entries(scores)) {
  sum += copyCount;
}

console.log("The elf has", sum, "cards");
