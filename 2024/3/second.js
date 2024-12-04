function second(textFile) {
  function applyConditionals() {
    let instructionEnabled = true;
    return function (instruction) {
      switch (instruction) {
        case "don't()":
          instructionEnabled = false;
          return false;
        case "do()":
          instructionEnabled = true;
          return false;

        default:
          return instructionEnabled;
      }
    };
  }

  return textFile
    .match(/mul\([0-9]{1,3},[0-9]{1,3}\)|don't\(\)|do\(\)/g)
    .filter(applyConditionals())
    .reduce((acc, curr) => {
      const [numberA, numberB] = curr
        .match(/[0-9]{1,3}/g)
        .map((number) => parseInt(number));

      return acc + numberA * numberB;
    }, 0);
}

module.exports = second;
