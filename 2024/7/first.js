function first(textFile) {
  const lines = textFile.split("\n");
  return lines
    .map((line) => {
      let [result, values] = line.split(": ");
      result = parseInt(result);
      values = values.split(" ");

      let permutations = [];
      for (let index = 0; index < values.length; index++) {
        const currentNumber = values[index];
        if (index === 0) {
          permutations.push(currentNumber);
        } else {
          permutations = permutations.flatMap((calc) => [
            eval(`${calc}+${currentNumber}`),
            eval(`${calc}*${currentNumber}`),
          ]);
        }
      }
      return [result, permutations.some((number) => number === result)];
    })
    .reduce((acc, curr) => {
      const [number, correct] = curr;
      return correct ? number + acc : acc;
    }, 0);
}

module.exports = { first };
