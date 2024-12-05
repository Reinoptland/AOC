const { parseInput, createLookup, isValidUpdate } = require("./first");

function second(textFile) {
  const { rules, updates } = parseInput(textFile);
  const lookup = createLookup(rules);

  return updates
    .filter((update) => !isValidUpdate(update, lookup))
    .map((update) => reOrderUpdate(update, lookup))
    .map((array) => parseInt(array[Math.floor(array.length / 2)]))
    .reduce((acc, curr) => acc + curr);
}
function reOrderUpdate([firstNumber, ...update], lookup) {
  const output = [firstNumber];
  for (let i = 0; i < update.length; i++) {
    const currentNumber = update[i];

    for (let j = 0; j < output.length; j++) {
      const processedNumber = output[j];
      if (lookup[currentNumber]?.pagesAfter[processedNumber]) {
        output.splice(j, 0, currentNumber);
        break;
      } else if (j === output.length - 1) {
        output.push(currentNumber);
        break;
      } else {
        continue;
      }
    }
  }

  return output;
}

module.exports = { second };
