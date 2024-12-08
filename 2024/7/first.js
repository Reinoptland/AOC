function add(number1, number2) {
  return number1 + number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function concatenate(number1, number2) {
  return parseInt(`${number1}${number2}`);
}

function first(textFile, operators) {
  const lines = textFile.split("\n");
  return lines
    .map((line) => {
      let [result, values] = line.split(": ");
      result = parseInt(result);
      values = values.split(" ").map((n) => parseInt(n));

      let permutations = [];
      for (let index = 0; index < values.length; index++) {
        const currentNumber = values[index];
        if (index === 0) {
          permutations.push(currentNumber);
        } else {
          permutations = permutations.flatMap((number) =>
            operators.map((operator) => operator(number, currentNumber))
          );
        }
      }
      return [result, permutations.some((number) => number === result)];
    })
    .reduce((acc, curr) => {
      const [number, correct] = curr;
      return correct ? number + acc : acc;
    }, 0);
}

module.exports = { first, add, multiply, concatenate };
